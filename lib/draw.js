var Game = require('./game');

var Draw = function(){
  var canvas = document.getElementById('screen');
  this.context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};

  var self = this;
  self.game = new Game(gameSize);

  var tick = function(){
    // self.update(self.game);
    self.draw(screen, gameSize);
    requestAnimationFrame(tick);
  };
  tick();

  window.onkeydown = function(e) {
    debugger;
    if(e.keycode === 37){
      self.game.update();

    }
    keyState[e.keyCode] = true;
  };

  window.onkeyup = function(e) {
    keyState[e.keyCode] = false;
  };


};

Draw.prototype.drawTank = function (context, game) {
  context.fillRect(game.bodies[0].x, game.bodies[0].y, game.bodies[0].size.x, game.bodies[0].size.y);
  // return this;
};

Draw.prototype.update = function (game) {
  // for (var i=0; i<game.bodies.length; i++) {

    game.update();
  // }
};


Draw.prototype.draw = function (screen, gameSize) {
  Draw.prototype.drawTank(this.context, this.game);
};

module.exports = Draw;
