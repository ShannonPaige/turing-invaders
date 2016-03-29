var Tank = require('./tank');

var Game = function(gameSize) {
  this.bodies = [new Tank(gameSize)];
}

module.exports = Game;
