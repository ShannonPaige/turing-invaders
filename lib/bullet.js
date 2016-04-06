var Bullet = function(x, y, direction, game) {
  this.size = { x: 8, y: 8};
  this.x = x;
  this.y = y;
  this.velocity = {};
  this.velocity.x = 0;
  this.velocity.y = direction;
  game.addBody(this);
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
