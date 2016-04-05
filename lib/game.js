var Level = require ("./level")

var Game = function(gameSize, context) {
  this.status = "inGame";
  this.points = 0
};

module.exports = Game;
