var Bullet = require('./bullet');

var Alien = function(location, i, speed) {
  this.size = { x: 30, y: 30 };
  this.x = location.x;
  this.y = location.y;
  this.speed = speed;
  this.patrol = 0;
  this.alien_image = new Array(new Image(), new Image());
  this.alien_image[0].src = "./assets/images/alien-"+ i + "-0.png";
  this.alien_image[1].src = "./assets/images/alien-"+ i + "-1.png";
};

Alien.prototype.moveRight = function () {
  this.x+=1;
};

Alien.prototype.moveLeft = function () {
  this.x-=1;
};

Alien.prototype.update = function (game, fireSpeed, fireRate) {
  this.updateSpeed();
  this.x += this.speed;
  this.patrol += this.speed;
  this.fireBullet(game, fireSpeed, fireRate);
};

Alien.prototype.updateSpeed = function(){
  if(this.patrol < 0 || this.patrol > 150) {
    this.speed = -this.speed;
  }
};

Alien.prototype.fireBullet = function(game, fireSpeed, fireRate){
  if (Math.random() > fireRate && !game.aliensBelow(this)) {
    new Bullet(this.x + (this.size.x / 2), this.y + 30, fireSpeed, game);
  }
};

Alien.prototype.draw = function (context, counter) {
  counter = counter % 20;
  if (counter >= 0 && counter < 10){
    context.drawImage(this.alien_image[0], this.x, this.y, 30, 30);
  }else {
    context.drawImage(this.alien_image[1], this.x, this.y, 30, 30);
  }
};

module.exports = Alien;
