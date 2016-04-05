var Bullet = function(center, velocity) {
  this.size = { x: 8, y: 8};
  this.x = center.x
  this.y = center.y
  this.velocity = velocity
};

Bullet.prototype.update = function () {
  this.x += this.velocity.x
  this.y += this.velocity.y
};

Bullet.prototype.draw = function (context) {
  context.fillStyle = "rgb(255,255,255)";
  context.fillRect(this.x, this.y, this.size.x, this.size.y);
};

module.exports = Bullet;
