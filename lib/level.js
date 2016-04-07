var Tank = require('./tank');
var Alien = require('./alien');

var Level = function(gameSize, context, speed) {
  this.bodies = [new Tank(gameSize)];
  this.status = 1;
  this.points = 0;
  for (var i = 0; i < 24; i++) {
    var x = (i % 8) * 60;
    var y = (i % 3) * 40;
    this.bodies.push(new Alien({x:x, y: y}, i%3+1, speed));

  }
};

Level.prototype.addBody = function(body){
  this.bodies.push(body);
};

Level.prototype.collision = function(body1, body2){
  return !(body1 === body2 ||
    body1.x + body1.size.x < body2.x ||
    body1.y + body1.size.y < body2.y ||
    body1.x > body2.x + body2.size.x ||
    body1.y > body2.y + body2.size.y);
};

Level.prototype.update = function(game, fireSpeed, fireRate){
  var self = this;
  var noCollision = function(body1) {
    return self.bodies.filter(function(body2) {
      return self.collision(body1, body2);
    }).length === 0;
  };
  this.bodies = this.bodies.filter(noCollision);
  var points = this.points;
  this.points = 24 - this.bodies.filter(function(body) { return body instanceof Alien; }).length;
  if(points !== this.points){
    game.points += (this.points - points);

  }
  document.getElementById("current_score").innerHTML = game.points;
  for (var i = 0; i < this.bodies.length; i++) {
    this.bodies[i].update(this, fireSpeed, fireRate);
  }
};

Level.prototype.aliensBelow = function(alien) {
  return this.bodies.filter(function(body) {
    return body instanceof Alien && body.y > alien.y && body.x - alien.x < alien.size.x;
  }).length > 0;
};

module.exports = Level;
