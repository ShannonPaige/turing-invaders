var Alien = function(location) {
  this.size = { x: 25, y: 25};
  this.x = location.x;
  this.y = location.y;
  // this.movement = 'moveRight'
  this.patrol = 0
  this.speed = 1
};

Alien.prototype.moveRight = function () {
  this.x+=1;
};

Alien.prototype.moveLeft = function () {
  this.x-=1;
};

Alien.prototype.update = function () {
  if(this.patrol < 0 || this.patrol > 225) {
    this.speed = -this.speed
  }
  this.x += this.speed
  this.patrol += this.speed

}

Alien.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.size.x, this.size.y);
};

module.exports = Alien;
