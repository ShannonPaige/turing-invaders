var Game = require('./game');
var Tank = require('./tank');
var Alien = require('./alien');
var Level = require('./level');


var Draw = function Draw(){
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height};
  var startImage = new Image();
  startImage.src = "./assets/images/start.png";
  var loseImage  = new Image();
  loseImage.src  = "./assets/images/lose.jpg";
  var winImage   = new Image();
  winImage.src  = "./assets/images/win.jpg";
  renderPoints();
  startImage.onload = function(){
    renderStart(context, startImage);
  };
  var game = new Game(gameSize, context);
  var speed = 0.5;
  var fireSpeed = 2;
  var fireRate = 0.995;
  canvas.onclick = function() {
    game.level = new Level(gameSize, context, speed);
    var counter = 0;
    console.log(speed, fireSpeed, fireRate);
    var tick = function(){
      switch (game.status) {
        case "inGame":
          inGame(context, gameSize, game, fireSpeed, fireRate, counter);
          requestAnimationFrame(tick);
        break;
        case "won":
          won(context, gameSize, game, speed, fireSpeed, fireRate, winImage);
        break;
        case "lost":
          lost(context, gameSize, game, speed, fireSpeed, fireRate, loseImage);
        break;
        case "newGame":
          newGame(context, gameSize, startImage);
        break;
      }
    };
    tick();
  };
};

function renderPoints(){
  var startPoints = localStorage.getItem('points') || 0;
  var startInitials = localStorage.getItem('initials') || "";
  document.getElementById('high_score').innerHTML = startInitials + " " + startPoints;
}

function inGame(context, gameSize, game, fireSpeed, fireRate, counter){
  game.level.update(game, fireSpeed, fireRate);
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  drawObject(context, game, counter);
  counter++;
  update(game);
}

function won(context, gameSize, game, speed, fireSpeed, fireRate, winImage){
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  renderWin(context, winImage);
  game.status = "inGame";
  speed += 0.5;
  fireSpeed += 1;
  fireRate -= 0.003;
}

function lost(context, gameSize, game, speed, fireSpeed, fireRate, loseImage){
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  renderLose(context, loseImage);
  game.status = "newGame";
  var highScore = localStorage.getItem('points');
  speed = 0.5;
  fireSpeed = 1;
  fireRate = 0.995;
  if(game.points > highScore) {
    updateScoreboard(game);
  }
}

function updateScoreboard(game){
  document.getElementById('form').classList.remove("hidden");
  var button = document.getElementById('button');
  button.addEventListener("click", function(e){
    renderHighScore(e, game, button);
  });
}

function renderHighScore(e, game, button){
  e.preventDefault();
  var initials = document.getElementById('input').value;
  localStorage.setItem('initials', initials);
  localStorage.setItem('points', game.points);
  document.getElementById('high_score').innerHTML = initials + " " + game.points;
  button.removeEventListener("click", this, false);
  document.getElementById('form').classList.add("hidden");
}

function newGame(context, gameSize, startImage){
  document.getElementById('form').classList.add("hidden");
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  new Game(gameSize, context);
  renderStart(context, startImage);
}

function drawObject(context, game, counter) {
  for (var i = 0; i < game.level.bodies.length; i++){
    game.level.bodies[i].draw(context, counter);
  }
}

function renderStart(context, image) {
  context.drawImage(image, 150, 100);
}

function renderLose(context, image) {
  context.drawImage(image, 150, 50, 200, 200);
}

function renderWin(context, image) {
  context.drawImage(image, 150, 50, 200, 150);
}

function update(game) {
  var aliens = game.level.bodies.filter(function(body) {return body instanceof Alien;});
  var tank = game.level.bodies.filter(function(body) {return body instanceof Tank;});
  if (tank.length > 0 && aliens.length === 0){
    game.status= "won";
  } else if(aliens.length > 0 && tank.length === 0){
    game.status= "lost";
  }
}

module.exports = Draw;
