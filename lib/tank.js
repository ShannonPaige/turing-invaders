var Bullet = require('./bullet');

var Tank = function(gameSize) {
  this.size = { x: 111, y: 25 };
  this.x = (gameSize.x - this.size.x)/2;
  this.y = gameSize.y - this.size.y;
  this.image = new Image();
  this.image.src = "./assets/images/tank.png";
};

Tank.prototype.update = function (level) {
  window.onkeydown = function(e) {
    if (e.keyCode === 37){
      this.moveLeft();
    } else if (e.keyCode === 39) {
      this.moveRight();
    } else if (e.keyCode === 32) {
      this.fire(level);
    }
  }.bind(this);
};

Tank.prototype.moveRight = function () {
  if(this.x < 600-this.size.x) {
    this.x+=5;
  }
};

Tank.prototype.moveLeft = function () {
  if(this.x > 0){
    this.x-=5;
  }
};

Tank.prototype.fire = function (level) {
  new Bullet( this.x + (this.size.x / 2), this.y - 10, -5, level);
};

Tank.prototype.draw = function (context) {
  context.drawImage(this.image, this.x, this.y-this.size.y, 111, 50);
};

module.exports = Tank;
