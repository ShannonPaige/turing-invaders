var Level = require ("./level")

var Game = function(gameSize, context) {
  this.level = new Level(gameSize, context);
  this.status = "inGame";
};

module.exports = Game;
