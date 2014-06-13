#!/usr/bin/env node

var spawn = require('child_process').spawn;
var argv = require('minimist')(process.argv.slice(2), { '--': true });
var fs = require('fs');
var quote = require('quotemeta');
var parser = require('tap-parser');
var join = require('path').join;

var broken = [];
var bin = join(require.resolve('mocha'), '..', 'bin', 'mocha');
var filename = join(process.cwd(), '.mocha-broken');

try {
  broken = JSON.parse(fs.readFileSync(filename, 'utf8'));
} catch (_) {}

var args = argv['--'] || [];
args.push('--reporter', 'tap');

if (broken.length) {
  args.push('--grep');
  args.push(broken.map(function(test){ return test.name; }).join('|'));
}

var ps = spawn(bin, args);
var tap = parser();

ps.stdout.on('data', function(line){ process.stdout.write(line.toString()); });
ps.stdout.pipe(tap);

tap.on('results', function(results){
  if (results.fail.length) {
    fs.writeFileSync(filename, JSON.stringify(results.fail));
  } else {
    try {
      fs.unlinkSync(filename);
    } catch (_) {}
  }
});

ps.stderr.pipe(process.stderr);
ps.on('exit', function(code){
  process.exit(code);
});

