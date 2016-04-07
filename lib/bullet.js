var Bullet = function(x, y, fireSpeed, level) {
  this.size = { x: 4, y: 4 };
  this.x = x;
  this.y = y;
  this.velocity = {};
  this.velocity.x = 0;
  this.velocity.y = fireSpeed;
  level.addBody(this);
};

Bullet.prototype.update = function () {
  this.x += this.velocity.x;
  this.y += this.velocity.y;
};

Bullet.prototype.draw = function (context) {
  context.fillStyle = "rgb(255,255,255)";
  context.fillRect(this.x, this.y, this.size.x, this.size.y);
};

module.exports = Bullet;
