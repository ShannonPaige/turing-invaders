var Tank = function(gameSize) {
  this.size = { x: 15, y: 15};
  this.x = gameSize.x / 2;
  this.y = gameSize.y - this.size.x;
  this.width = 150;
  this.height = 50;
}

// Tank.prototype.moveRight = function () {
//
// };
//
// Tank.prototype.moveLeft = function () {
//
// };

module.exports = Tank;
