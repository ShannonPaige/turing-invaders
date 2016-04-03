var Game = require('./game');
var Tank = require('./tank');

var Draw = function(){
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};
  var image = new Image()
  image.src = "/assets/images/start.png"
  image.onload = function(){
    renderStart(context, image)
  }
  window.onclick = function(e) {
    var game = new Game(gameSize, context);
    var tick = function(){
      game.update();
      context.clearRect(0, 0, 600, 300);
      drawObject(context, game);
      update(game, context, image)
      requestAnimationFrame(tick);
    }
    tick();
  }
};

function drawObject(context, game) {
  for (var i = 0; i < game.bodies.length; i++){
    game.bodies[i].draw(context)
  }
}

function renderStart(context, image) {
  context.drawImage(image, 200, 100)
}

function update(game, context, image) {
  if (game.bodies[0] instanceof Tank){
    game.update();
  } else{
    game.bodies = []
    renderStart(context, image)
  }
};

module.exports = Draw;
