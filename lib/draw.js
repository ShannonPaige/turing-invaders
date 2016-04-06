var Game = require('./game');
var Tank = require('./tank');
var Alien = require('./alien');
var Level = require('./level');


var Draw = function Draw(){
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};
  var startPoints = localStorage.getItem('points') || 0
  var startInitials = localStorage.getItem('initials') || ""
  document.getElementById('high_score').innerHTML = startInitials + " " + startPoints
  var startImage = new Image();
  startImage.src = "/assets/images/start.png";
  startImage.onload = function(){
    renderStart(context, startImage);
  };
  var game = new Game(gameSize, context);
  canvas.onclick = function() {
    var speed = 1
    var fireSpeed = 3
    var fireRate = 0.995
    game.level = new Level(gameSize, context, speed);
    speed += 1
    fireSpeed += 1
    fireRate -= 0.003
    var counter = 0;
    var tick = function(){
      switch (game.status) {
        case "inGame":
          game.level.update(game, fireSpeed, fireRate);
          context.clearRect(0, 0, gameSize.x, gameSize.y);
          drawObject(context, game, counter);
          counter++;
          update(game);
          requestAnimationFrame(tick);
          break;
        case "won":
          console.log("Winning Level");
          context.clearRect(0, 0, gameSize.x, gameSize.y);
          context.fillText("You Won the Level!", 50, 50);
          game.status = "inGame";
          break;
        case "lost":
          console.log("Lost");
          context.clearRect(0, 0, gameSize.x, gameSize.y);
          context.fillText("You Lost!", 50, 50);
          game.status = "newGame";
          var highScore = localStorage.getItem('points')
          if(game.points > highScore) {
            document.getElementById('form').classList.remove("hidden");
            var button = document.getElementById('button')
            button.addEventListener("click", function(e){
              e.preventDefault();
              var initials = document.getElementById('input').value
              localStorage.setItem('initials', initials);
              localStorage.setItem('points', game.points);
              document.getElementById('high_score').innerHTML = initials + " " + game.points
              button.removeEventListener("click", this, false)
            })

          }
          break;
        case "newGame":
        document.getElementById('form').classList.add("hidden");

          game = new Game(gameSize, context);
          renderStart(context, startImage);
          break;

      }
    };
    tick();
  };
};

function drawObject(context, game, counter) {
  for (var i = 0; i < game.level.bodies.length; i++){
    game.level.bodies[i].draw(context, counter);
  }
}

function renderStart(context, image) {
  context.drawImage(image, 450, 100);
}

function update(game) {
  var aliens = game.level.bodies.filter(function(body) {return body instanceof Alien;});
  var tank = game.level.bodies.filter(function(body) {return body instanceof Tank;});
  if (tank.length > 0 && aliens.length === 0){
    console.log("Yow won");
    game.status= "won";
  } else if(aliens.length > 0 && tank.length === 0){
    console.log("You lost");
    game.status= "lost";
  }
}

module.exports = Draw;
