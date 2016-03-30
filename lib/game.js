var Tank = require('./tank');
var Listener = require('./listener')

var Game = function(gameSize) {
  this.bodies = [new Tank(gameSize)];
  debugger;
  this.listener = new Listener();
}

Game.prototype.update = function(){
  if (this.listener.isDown(this.listener.KEYS.LEFT)){
    debugger
    this.bodies[0].moveLeft;
  } else if (this.listener.isDown(this.listener.KEYS.RIGHT)){
    this.bodies[0].moveRight;
  }

  
}

module.exports = Game;
