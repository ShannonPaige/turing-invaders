var Tank = require('./tank');
var Bullet = require('./bullet');
var Alien = require('./alien');
var _ = require('lodash');

var Game = function(gameSize) {
  // var bodies = [];
  this.bodies = [new Tank(gameSize)];
  for (var i = 0; i < 24; i++) {
    var x = (i % 8) * 50
    var y = (i % 3) * 50
    this.bodies.push(new Alien({x:x, y: y}));
  }
  // addBody: function(body) {
  //   this.bodies.push(body)
  // }
};

Game.prototype.addBody = function(body){
  this.bodies.push(body)
}

Game.prototype.update = function(){
  for (var i = 0; i < this.bodies.length; i++) {
    this.bodies[i].update(this)
  }
};

Game.prototype.aliensBelow = function() {
  debugger
}
module.exports = Game;
