var Bullet = require('./bullet');

var Alien = function(location) {
  this.size = { x: 25, y: 25};
  this.x = location.x;
  this.y = location.y;
  // this.movement = 'moveRight'
  this.patrol = 0
  this.speed = 1
  this.alien_1 = new Array();
  this.alien_1[0] = new Image()
  this.alien_1[0].src = "/assets/images/alien-1-0.png"
  this.alien_1[1] = new Image()
  this.alien_1[1].src = "/assets/images/alien-1-1.png"
};

Alien.prototype.moveRight = function () {
  this.x+=1;
};

Alien.prototype.moveLeft = function () {
  this.x-=1;
};

Alien.prototype.update = function (game) {
  if(this.patrol < 0 || this.patrol > 325) {
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

Alien.prototype.draw = function (context, counter) {
  var frame = counter%2;
  context.drawImage(this.alien_1[frame], this.x, this.y)
};

module.exports = Alien;
