var Game = require('./game')

var Draw = function(){
  var canvas = document.getElementById('screen');
  this.context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};

  var self = this;
  self.game = new Game(gameSize);



  var tick = function(){
    self.update();
    self.draw(screen, gameSize);
    requestAnimationFrame(tick)
  }
  tick();
}

Draw.prototype.drawTank = function (context, game) {
  context.fillRect(game.bodies[0].x, game.bodies[0].y, game.bodies[0].width, game.bodies[0].height);
  // return this;
};

Draw.prototype.update = function () {
}


Draw.prototype.draw = function (screen, gameSize) {
  Draw.prototype.drawTank(this.context, this.game);

}

module.exports = Draw;
