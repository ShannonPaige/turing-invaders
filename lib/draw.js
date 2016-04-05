var Game = require('./game');
var Tank = require('./tank');
var Alien = require('./alien');
var Level = require('./level');


var Draw = function Draw(){
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};
  var startImage = new Image()
  startImage.src = "/assets/images/start.png"
  startImage.onload = function(){
    renderStart(context, startImage)
  }
  window.onclick = function(e) {
    var game = new Game(gameSize, context);
    var counter = 0;
    var tick = function(){
      switch (game.status) {
        case "inGame":
          game.level.update();
          context.clearRect(0, 0, gameSize.x, gameSize.y);
          drawObject(context, game, counter);
          counter++;
          update(game, context, startImage, gameSize)
          requestAnimationFrame(tick);
          break;
        case "won":
          console.log("Winning Level")
          context.clearRect(0, 0, gameSize.x, gameSize.y);
          context.fillText("You Won the Level!", 50, 50)
          game.level = new Level(gameSize, context)
          break;
        case "lost":
          console.log("Lost")
          context.clearRect(0, 0, gameSize.x, gameSize.y);
          context.fillText("You Lost!", 50, 50)
          // renderStart(context, startImage)
          break;
      }
    }
    tick();
  }
};

function drawObject(context, game, counter) {
  for (var i = 0; i < game.level.bodies.length; i++){
    game.level.bodies[i].draw(context, counter)
  }
}

function renderStart(context, image) {
  context.drawImage(image, 450, 100)
}

function update(game, context, image, gameSize) {
  var aliens = game.level.bodies.filter(function(body) {return body instanceof Alien});
  var tank = game.level.bodies.filter(function(body) {return body instanceof Tank});
  if (tank.length > 0 && aliens.length === 0){
    console.log("Yow won")
    game.status= "won"
  } else if(aliens.length > 0 && tank.length === 0){
    console.log("You lost")
    game.status= "lost"
  }
};

module.exports = Draw;
