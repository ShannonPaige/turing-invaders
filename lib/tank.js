var Bullet = require('./bullet');

var Tank = function(gameSize) {
  this.size = { x: 50, y: 50};
  this.x = (gameSize.x - this.size.x)/2;
  this.y = gameSize.y - this.size.y;
  this.image = new Image()
  this.image.src = "/assets/images/tank.png"
};

Tank.prototype.update = function (game) {
  window.onkeydown = function(e) {
    if (e.keyCode === 37){
      this.moveLeft();
    } else if (e.keyCode === 39) {
      this.moveRight();
    } else if (e.keyCode === 32) {
      this.fire(game)
    }
  }.bind(this);
}

Tank.prototype.moveRight = function () {
  this.x+=5;
};

Tank.prototype.moveLeft = function () {
  this.x-=5;
};

Tank.prototype.fire = function (game) {
  var bullet = new Bullet({x: this.x + (this.size.x / 2), y: this.y - 5 },
                          {x: 0, y: -3});
  game.addBody(bullet);
}

Tank.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.size.x, this.size.y);
}
module.exports = Tank;
