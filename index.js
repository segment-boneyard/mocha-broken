var spawn = require('child_process').spawn;
var split = require('split');
var fs = require('fs');
var quote = require('quotemeta');
var mocha = require('mocha');

var broken = {};
var bin = __dirname + '/node_modules/.bin/mocha';
var filename = process.cwd() + '/.mocha-broken';

try {
  broken = JSON.parse(fs.readFileSync(filename, 'utf8'));
} catch (_) {}

var args = ['--reporter', 'json-stream'];
if (Object.keys(broken).length) {
  args.push('--grep');
  args.push(Object.keys(broken).map(quote).join('|'));
}

var ps = spawn(bin, args);
ps.stdout.pipe(split()).on('data', function(line){
  console.log(line);

  var update = JSON.parse(line);
  var type = update[0];
  var test = update[1];
  var title = test.title;

  if ('start' == type) return;
  if ('pass' == type) return delete broken[title];
  if ('fail' == type) return broken[title] = true;
  if ('end' == type) {
    fs.writeFileSync(filename, JSON.stringify(broken));
  }
});
ps.stderr.pipe(process.stderr);
ps.on('exit', function(code){
  process.exit(code);
});

