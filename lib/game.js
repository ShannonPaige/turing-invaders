var Tank = require('./tank');
var Bullet = require('./bullet');
var Alien = require('./alien');
var _ = require('lodash');

var Game = function(gameSize, context) {
  this.bodies = [new Tank(gameSize)];
  for (var i = 0; i < 24; i++) {
    var x = (i % 8) * 50
    var y = (i % 3) * 50
    this.bodies.push(new Alien({x:x, y: y}));
  }
};

Game.prototype.addBody = function(body){
  this.bodies.push(body)
}

Game.prototype.collision = function(body1, body2){
  return !(body1 === body2 ||
    body1.x + body1.size.x < body2.x ||
    body1.y + body1.size.y < body2.y ||
    body1.x > body2.x + body2.size.x ||
    body1.y > body2.y + body2.size.y)
}

Game.prototype.update = function(){
  var self = this
  var noCollision = function(body1) {
    return self.bodies.filter(function(body2) {
      return self.collision(body1, body2)
    }).length === 0
  }
  this.bodies = this.bodies.filter(noCollision)
  for (var i = 0; i < this.bodies.length; i++) {
    this.bodies[i].update(this)
  }
};

Game.prototype.aliensBelow = function(alien) {
  return this.bodies.filter(function(body) {
    return body instanceof Alien && body.y > alien.y && body.x - alien.x < alien.size.x
  }).length > 0
}

module.exports = Game;
