function Flake (options) {
  this.options = options;

  this.character = options.characters[
    Math.floor(Math.random() * options.characters.length)
  ];

  // must be > 0
  this.fallMultiplier = Math.ceil(Math.random() * options.fallMultiplier);

  this.position = {
    x: Math.floor(Math.random() * process.width),
    y: 1
  };
}

Flake.prototype.shimmy = function () {
  this.position.y += 1 * this.fallMultiplier;

  if (this.position.y >= process.height) {
    return;
  }

  var shouldMove = Math.random() > .7
  var shouldMoveRight = Math.random() > .5;
  var shouldMoveHowMany = Math.floor(Math.random() * this.options.gustiness);

  if (!shouldMove) {
    return;
  }

  if (shouldMoveRight) {
    this.position.x += shouldMoveHowMany;
  } else {
    this.position.x -= shouldMoveHowMany;
  }

  this.position.x = Math.abs(this.position.x);
};

module.exports = Flake;
