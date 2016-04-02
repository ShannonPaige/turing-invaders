var Game = require('./game');

var Draw = function(){
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};
  var game = new Game(gameSize);

  var tick = function(){
    game.update();
    context.clearRect(0, 0, 600, 300);
    drawObject(context, game);
    requestAnimationFrame(tick);
  };
  tick();
};

function drawObject(context, game) {
  for (var i = 0; i < game.bodies.length; i++){
    game.bodies[i].draw(context)
  }
}

function update(game) {
  game.update();
};

module.exports = Draw;
