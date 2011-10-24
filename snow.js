#!/usr/bin/env node

var tty = require('tty'),
    window = tty.getWindowSize(1),
    height = window[0],
    width = window[1];

var flake = function(){
  var position = {
    x: Math.floor(Math.random() * width),
    y: 1
  };
  var character = snow.characters[Math.floor(Math.random() * snow.characters.length)];
  return {
    positions: [],
    position: position,
    character: character,
    shimmy: function(){
      this.positions.push({
        x: this.position.x,
        y: this.position.y
      });
      this.position.y++;
        //var x = Math.floor(Math.random() * 5);
        //if (this.position.y % 2 == 1) this.position.x = Math.floor(this.position.x + x);
        //this.position.x = Math.floor(this.position.x - x);
    }
  }
}

var flakes = [];

var snow = {
  frames: 0,
  fps: 20,
  flakesPerSecond: 10,
  flakeCount: 500,
  escape: '\033[',
  characters: ['.',',','*'],

  render: function(){
    //snow.clear();
    for (var i in flakes) {
      var f = flakes[i];
      f.shimmy();
      for (var j in f.positions) {
        snow.pos(f.positions[j].x, f.positions[j].y);
        process.stdout.write(' ');
        f.positions.splice(j, 1);
      }
      snow.pos(f.position.x, f.position.y);
      process.stdout.write(f.character);
    }
    snow.frames++;
  },

  pos: function(x, y){
    if (x && y) process.stdout.write(snow.escape + String(y) + ';' + String(x) + 'f');
  },
  clear: function(){
    process.stdout.write(snow.escape + '2J');
  },

  create: function(){
    if (flakes.length < snow.flakeCount) flakes.push(new flake);
  },

  init: function(){
    snow.clear();
    process.stdout.write(snow.escape + '?25l');
    setInterval(snow.render, 1000 / snow.fps);
    setInterval(snow.create, 1000 / snow.flakesPerSecond);
  }
}

process.on('SIGINT', function(){
  snow.clear();
  snow.pos(1, 1);
  process.stdout.write(snow.escape + '?25h');
  process.exit();
});

snow.init();
