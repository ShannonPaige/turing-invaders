var Alien = function(location) {
  this.size = { x: 25, y: 25};
  this.x = location.x;
  this.y = location.y;
};

Alien.prototype.moveRight = function () {
  this.x+=1;
};

Alien.prototype.moveLeft = function () {
  this.x-=1;
};

module.exports = Alien;
