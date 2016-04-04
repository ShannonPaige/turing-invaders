var Bullet = require('./bullet');

var Alien = function(location) {
  this.size = { x: 25, y: 25};
  this.x = location.x;
  this.y = location.y;
  // this.movement = 'moveRight'
  this.patrol = 0
  this.speed = 2
  this.image = new Image()
  this.image.src = "/assets/images/alien1.gif"
};

Alien.prototype.moveRight = function () {
  this.x+=1;
};

Alien.prototype.moveLeft = function () {
  this.x-=1;
};

Alien.prototype.update = function (game) {
  if(this.patrol < 0 || this.patrol > 225) {
    this.speed = -this.speed
  }
  this.x += this.speed
  this.patrol += this.speed
  if (Math.random() > 0.995 && !game.aliensBelow(this)) {
    var bullet = new Bullet({x: this.x + (this.size.x / 2), y: this.y + 26 },
                            {x: 0, y: 3});
    game.addBody(bullet)
  }

}

Alien.prototype.draw = function (context) {
  context.drawImage(this.image, this.x, this.y)
};

module.exports = Alien;
