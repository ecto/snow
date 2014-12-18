#!/usr/bin/env node
var cli = require('cli');
var Snow = require('./snow');

cli.parse({
  emoji: ['e', 'Enable emoji snowflakes', 'boolean', false],
  gustiness: ['g', 'Lateral movement multiplier', 'number', 5],
  fallMultiplier: ['f', 'Vertical movement multiplier', 'number', 2],
  cleanWindow: ['c', 'Disable window smearing', 'boolean', true],
  flakesPerSecond: ['flakes', 'Flakes per second', 'number', 20],
  framesPerSecond: ['frames', 'Frames per second', 'number', 30],
});

cli.main(function (args, options) {
  var snow = new Snow(options);
  snow.init();

  process.on('SIGINT', function () {
    snow.clear();
    snow.pos(1, 1);
    process.stdout.write(snow.escape + '?25h');
    process.exit();
  });

  process.height = process.stdout.rows;
  process.width = process.stdout.columns;

  process.stdout.on('resize', function () {
    process.height = process.stdout.rows;
    process.width = process.stdout.columns;
  });
});

