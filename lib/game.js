var Tank = require('./tank');
// var Listener = require('./listener')

var Game = function(gameSize) {
  this.bodies = [new Tank(gameSize)];
  // this.listener = new Listener();
}

Game.prototype.update = function(){
  // if (this.listener.isDown(this.listener.KEYS.LEFT)){
    window.onkeydown = function(e) {
      if (e.keyCode === 37){
        // debugger 
        this.bodies[0].moveLeft();

      } else if (e.keyCode === 39) {

        this.bodies[0].moveRight();
      }
  // } else if (this.listener.isDown(this.listener.KEYS.RIGHT)){
  }.bind(this)


}

module.exports = Game;
