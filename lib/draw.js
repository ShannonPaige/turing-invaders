var Game = require('./game');

var Draw = function(){
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};
  var game = new Game(gameSize);

  var tick = function(){
    game.update();
    context.clearRect(0, 0, 600, 300);
    drawTank(context, game);
    drawAlien(context, game);
    requestAnimationFrame(tick);
  };
  tick();
};

function drawTank(context, game) {
  context.fillRect(game.bodies[0].x, game.bodies[0].y, game.bodies[0].size.x, game.bodies[0].size.y);
};

function drawAlien(context, game) {
  game.bodies[1].forEach(function(alien) {
    context.fillRect(alien.x, alien.y, alien.size.x, alien.size.y);
  });
};

function update(game) {
  game.update();
};

module.exports = Draw;
