var Tank = function(gameSize) {
  this.size = { x: 100, y: 50};
  this.x = (gameSize.x - this.size.x)/2;
  this.y = gameSize.y - this.size.y;
}

Tank.prototype.moveRight = function () {
  this.x+=2
};

Tank.prototype.moveLeft = function () {
  this.x-=2
};

module.exports = Tank;
