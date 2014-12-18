var Flake = require('./flake');
var colors = require('colors');

var defaultOptions = {
  emoji: false,
  gustiness: 5,
  fallMultiplier: 2,
  cleanWindow: true,
  flakesPerSecond: 20,
  framesPerSecond: 30
}

var possibleColors = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white'
];

function Snow (options) {
  this.options = options || defaultOptions;
  this.flakes = [];
  this.escape = '\033[';

  if (options.emoji) {
    this.options.characters = [
      '\u2744\uFE0F', // snowflake
      // '\u26C4\uFE0F' // snowman
    ];
  } else {
    this.options.characters = [
      '.',
      ',',
      '*',
      '#',
      '-',
      '❄'
    ];
  }

};

Snow.prototype.init = function () {
  this.clear();
  process.stdout.write(this.escape + '?25l');
  setInterval(this.render.bind(this), 1000 / this.options.framesPerSecond);
  setInterval(this.create.bind(this), 1000 / this.options.flakesPerSecond);
};

Snow.prototype.render = function () {
  if (this.options.cleanWindow) {
    this.clear();
  }

  for (var i in this.flakes) {
    var flake = this.flakes[i];

    if (!this.options.cleanWindow) {
      this.pos(flake.position.x, flake.position.y);
      process.stdout.write(' ');
    }

    flake.shimmy();

    this.pos(flake.position.x,  flake.position.y);

    if (!this.options.rainbow) {
      process.stdout.write(flake.character);
    } else {
      var chosenColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
      process.stdout.write(flake.character[chosenColor]);
    }

  }
};

Snow.prototype.pos = function (x, y) {
  if (x && y) {
    process.stdout.write(this.escape + String(y) + ';' + String(x) + 'f');
  }
};

Snow.prototype.clear = function () {
  process.stdout.write(this.escape + '2J');
};

Snow.prototype.create = function () {
  var flake = new Flake(this.options);
  this.flakes.push(flake);

  var that = this;
  setTimeout(function () {
    var index = that.flakes.indexOf(flake);
    that.flakes.splice(index, 1);
  }, 10000);
};

module.exports = Snow;
