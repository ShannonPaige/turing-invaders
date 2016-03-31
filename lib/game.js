var Tank = require('./tank');
var Alien = require('./alien');

// var Listener = require('./listener')

var Game = function(gameSize) {
  var aliens = []
  for (var i = 0; i < 8; i++) {
    aliens.push(new Alien({x:i * 50, y: 2}))
  }
  console.log(aliens)
  this.bodies = [new Tank(gameSize), aliens];

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
