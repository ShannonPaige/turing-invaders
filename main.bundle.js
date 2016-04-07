/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	window.onload = function () {
	  var draw = __webpack_require__(1);
	  var audio = new Audio('./assets/audio/music.mp3');
	  audio.play();
	  draw();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Game = __webpack_require__(2);
	var Tank = __webpack_require__(3);
	var Alien = __webpack_require__(5);
	var Level = __webpack_require__(6);

	var Draw = function Draw() {
	  var canvas = document.getElementById('screen');
	  var context = canvas.getContext('2d');
	  var gameSize = { x: canvas.width, y: canvas.height };
	  var startImage = new Image();
	  startImage.src = "./assets/images/start.png";
	  var loseImage = new Image();
	  loseImage.src = "./assets/images/lose.jpg";
	  var winImage = new Image();
	  winImage.src = "./assets/images/win.jpg";
	  renderPoints();
	  startImage.onload = function () {
	    renderStart(context, startImage);
	  };
	  var game = new Game(gameSize, context);
	  var speed = 0.5;
	  var fireSpeed = 2;
	  var fireRate = 0.995;
	  canvas.onclick = function () {
	    game.level = new Level(gameSize, context, speed);
	    var counter = 0;
	    console.log(speed, fireSpeed, fireRate);
	    var tick = function tick() {
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
	          game = newGame(context, gameSize, startImage);
	          break;
	      }
	    };
	    tick();
	  };
	};

	function renderPoints() {
	  var startPoints = localStorage.getItem('points') || 0;
	  var startInitials = localStorage.getItem('initials') || "";
	  document.getElementById('high_score').innerHTML = startInitials + " " + startPoints;
	}

	function inGame(context, gameSize, game, fireSpeed, fireRate, counter) {
	  game.level.update(game, fireSpeed, fireRate);
	  context.clearRect(0, 0, gameSize.x, gameSize.y);
	  drawObject(context, game, counter);
	  counter++;
	  update(game);
	}

	function won(context, gameSize, game, speed, fireSpeed, fireRate, winImage) {
	  context.clearRect(0, 0, gameSize.x, gameSize.y);
	  renderWin(context, winImage);
	  game.status = "inGame";
	  speed += 0.5;
	  fireSpeed += 1;
	  fireRate -= 0.003;
	}

	function lost(context, gameSize, game, speed, fireSpeed, fireRate, loseImage) {
	  context.clearRect(0, 0, gameSize.x, gameSize.y);
	  renderLose(context, loseImage);
	  game.status = "newGame";
	  var highScore = localStorage.getItem('points');
	  speed = 0.5;
	  fireSpeed = 1;
	  fireRate = 0.995;
	  if (game.points > highScore) {
	    updateScoreboard(game);
	  }
	}

	function updateScoreboard(game) {
	  document.getElementById('form').classList.remove("hidden");
	  var button = document.getElementById('button');
	  button.addEventListener("click", function (e) {
	    renderHighScore(e, game, button);
	  });
	}

	function renderHighScore(e, game, button) {
	  e.preventDefault();
	  var initials = document.getElementById('input').value;
	  localStorage.setItem('initials', initials);
	  localStorage.setItem('points', game.points);
	  document.getElementById('high_score').innerHTML = initials + " " + game.points;
	  button.removeEventListener("click", this, false);
	  document.getElementById('form').classList.add("hidden");
	}

	function newGame(context, gameSize, startImage) {
	  document.getElementById('form').classList.add("hidden");
	  context.clearRect(0, 0, gameSize.x, gameSize.y);
	  renderStart(context, startImage);
	  return new Game(gameSize, context);
	}

	function drawObject(context, game, counter) {
	  for (var i = 0; i < game.level.bodies.length; i++) {
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
	  var aliens = game.level.bodies.filter(function (body) {
	    return body instanceof Alien;
	  });
	  var tank = game.level.bodies.filter(function (body) {
	    return body instanceof Tank;
	  });
	  if (tank.length > 0 && aliens.length === 0) {
	    game.status = "won";
	  } else if (aliens.length > 0 && tank.length === 0) {
	    game.status = "lost";
	  }
	}

	module.exports = Draw;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var Game = function Game() {
	  this.status = "inGame";
	  this.points = 0;
	};

	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Bullet = __webpack_require__(4);

	var Tank = function Tank(gameSize) {
	  this.size = { x: 111, y: 25 };
	  this.x = (gameSize.x - this.size.x) / 2;
	  this.y = gameSize.y - this.size.y;
	  this.image = new Image();
	  this.image.src = "./assets/images/tank.png";
	};

	Tank.prototype.update = function (level) {
	  window.onkeydown = (function (e) {
	    if (e.keyCode === 37) {
	      this.moveLeft();
	    } else if (e.keyCode === 39) {
	      this.moveRight();
	    } else if (e.keyCode === 32) {
	      this.fire(level);
	    }
	  }).bind(this);
	};

	Tank.prototype.moveRight = function () {
	  if (this.x < 600 - this.size.x) {
	    this.x += 5;
	  }
	};

	Tank.prototype.moveLeft = function () {
	  if (this.x > 0) {
	    this.x -= 5;
	  }
	};

	Tank.prototype.fire = function (level) {
	  new Bullet(this.x + this.size.x / 2, this.y - 10, -5, level);
	};

	Tank.prototype.draw = function (context) {
	  context.drawImage(this.image, this.x, this.y - this.size.y, 111, 50);
	};

	module.exports = Tank;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var Bullet = function Bullet(x, y, fireSpeed, level) {
	  this.size = { x: 4, y: 4 };
	  this.x = x;
	  this.y = y;
	  this.velocity = {};
	  this.velocity.x = 0;
	  this.velocity.y = fireSpeed;
	  level.addBody(this);
	};

	Bullet.prototype.update = function () {
	  this.x += this.velocity.x;
	  this.y += this.velocity.y;
	};

	Bullet.prototype.draw = function (context) {
	  context.fillStyle = "rgb(255,255,255)";
	  context.fillRect(this.x, this.y, this.size.x, this.size.y);
	};

	module.exports = Bullet;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Bullet = __webpack_require__(4);

	var Alien = function Alien(location, i, speed) {
	  this.size = { x: 30, y: 30 };
	  this.x = location.x;
	  this.y = location.y;
	  this.speed = speed;
	  this.patrol = 0;
	  this.alien_image = new Array(new Image(), new Image());
	  this.alien_image[0].src = "./assets/images/alien-" + i + "-0.png";
	  this.alien_image[1].src = "./assets/images/alien-" + i + "-1.png";
	};

	Alien.prototype.moveRight = function () {
	  this.x += 1;
	};

	Alien.prototype.moveLeft = function () {
	  this.x -= 1;
	};

	Alien.prototype.update = function (game, fireSpeed, fireRate) {
	  this.updateSpeed();
	  this.x += this.speed;
	  this.patrol += this.speed;
	  this.fireBullet(game, fireSpeed, fireRate);
	};

	Alien.prototype.updateSpeed = function () {
	  if (this.patrol < 0 || this.patrol > 150) {
	    this.speed = -this.speed;
	  }
	};

	Alien.prototype.fireBullet = function (game, fireSpeed, fireRate) {
	  if (Math.random() > fireRate && !game.aliensBelow(this)) {
	    new Bullet(this.x + this.size.x / 2, this.y + 30, fireSpeed, game);
	  }
	};

	Alien.prototype.draw = function (context, counter) {
	  counter = counter % 20;
	  if (counter >= 0 && counter < 10) {
	    context.drawImage(this.alien_image[0], this.x, this.y, 30, 30);
	  } else {
	    context.drawImage(this.alien_image[1], this.x, this.y, 30, 30);
	  }
	};

	module.exports = Alien;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Tank = __webpack_require__(3);
	var Alien = __webpack_require__(5);

	var Level = function Level(gameSize, context, speed) {
	  this.bodies = [new Tank(gameSize)];
	  this.points = 0;
	  for (var i = 0; i < 24; i++) {
	    var x = i % 8 * 60;
	    var y = i % 3 * 40;
	    this.bodies.push(new Alien({ x: x, y: y }, i % 3 + 1, speed));
	  }
	};

	Level.prototype.addBody = function (body) {
	  this.bodies.push(body);
	};

	Level.prototype.collision = function (body1, body2) {
	  return !(body1 === body2 || body1.x + body1.size.x < body2.x || body1.y + body1.size.y < body2.y || body1.x > body2.x + body2.size.x || body1.y > body2.y + body2.size.y);
	};

	Level.prototype.update = function (game, fireSpeed, fireRate) {
	  this.updateBodies();
	  this.updatePoints(game);
	  for (var i = 0; i < this.bodies.length; i++) {
	    this.bodies[i].update(this, fireSpeed, fireRate);
	  }
	};

	Level.prototype.updateBodies = function () {
	  var self = this;
	  var noCollision = function noCollision(body1) {
	    return self.bodies.filter(function (body2) {
	      return self.collision(body1, body2);
	    }).length === 0;
	  };
	  this.bodies = this.bodies.filter(noCollision);
	};

	Level.prototype.updatePoints = function (game) {
	  var points = this.points;
	  this.points = 24 - this.bodies.filter(function (body) {
	    return body instanceof Alien;
	  }).length;
	  if (points !== this.points) {
	    game.points += this.points - points;
	  }
	  document.getElementById("current_score").innerHTML = game.points;
	};

	Level.prototype.aliensBelow = function (alien) {
	  return this.bodies.filter(function (body) {
	    return body instanceof Alien && body.y > alien.y && body.x - alien.x < alien.size.x;
	  }).length > 0;
	};

	module.exports = Level;

/***/ }
/******/ ]);