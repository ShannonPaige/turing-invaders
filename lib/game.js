var Tank = require('./tank');
var Listener = require('./listener')

var Game = function(gameSize) {
  this.bodies = [new Tank(gameSize)];
  this.listener = new Listener();
  debugger;
}

Game.prototype.update = function(){
  if (this.listener.isDown(this.listener.KEYS.LEFT)){
    this.bodies[0].moveLeft;
  } else if (this.listener.isDown(this.listener.KEYS.RIGHT)){
    this.bodies[0].moveRight;
  }
}

module.exports = Game;
