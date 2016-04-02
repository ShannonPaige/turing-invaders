var Bullet = function(center, velocity) {
  this.size = { x: 3, y: 3};
  this.x = center.x
  this.y = center.y
  this.velocity = velocity
};

Bullet.prototype.update = function () {
  this.x += this.velocity.x
  this.y += this.velocity.y
};

Bullet.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.size.x, this.size.y);
};

module.exports = Bullet;
