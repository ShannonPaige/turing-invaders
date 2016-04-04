var Game = require('./game');
var Tank = require('./tank');
var Alien = require('./alien');

var Draw = function Draw(){
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
      switch (game.status) {
        case "inGame":
          game.update();
          context.clearRect(0, 0, 600, 300);
          drawObject(context, game);
          update(game, context, image, gameSize)
          requestAnimationFrame(tick);
          break;
        case "won":
          console.log("Winning")
          context.clearRect(0, 0, 600, 300);
          context.fillText("You Won!")
          break;
        case "lost":
          console.log("Lost")
          context.clearRect(0, 0, 600, 300);
          context.fillText("You Lost :()!", 50, 50)
          // renderStart(context, image)
          break;
      }
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

function update(game, context, image, gameSize) {
  var aliens = game.bodies.filter(function(body) {return body instanceof Alien});
  var tank = game.bodies.filter(function(body) {return body instanceof Tank});

  if (tank.length > 0 && aliens.length === 0){
    console.log("Yow won")
    game.status= "won"
  } else if(aliens.length > 0 && tank.length === 0){
    console.log("You lost")
    game.status= "lost"
  }
};

module.exports = Draw;
