var Tank = require('./tank');
var Bullet = require('./bullet');
var Alien = require('./alien');
var _ = require('lodash');

var Game = function(gameSize) {
  // var bodies = [];
  this.bodies = [new Tank(gameSize)];
  for (var i = 0; i < 8; i++) {
    this.bodies.push(new Alien({x:i * 50, y: 2}));
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

module.exports = Game;
