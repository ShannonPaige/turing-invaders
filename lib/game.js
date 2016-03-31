var Tank = require('./tank');
var Alien = require('./alien');
var _ = require('lodash');


var Game = function(gameSize) {
  var aliens = [];
  for (var i = 0; i < 8; i++) {
    aliens.push(new Alien({x:i * 50, y: 2}));
  }
  this.bodies = [new Tank(gameSize), aliens];
  this.movement = 'moveRight'
};

Game.prototype.update = function(){
  var xcoords = this.bodies[1].map( function(obj){
    return obj.x
  });
  if (_.max(xcoords) < 575 && this.movement === 'moveRight'){
    this.movement = 'moveRight'
  } else if (_.max(xcoords) === 575) {
    this.movement = "moveLeft"
  } else if (_.min(xcoords) > 0 && this.movement === 'moveLeft'){
    this.movement = 'moveLeft'
  } else if (_.min(xcoords) === 0) {
    this.movement = 'moveRight'
  }
  var game = this;
  this.bodies[1].forEach(function(alien) {
    if (game.movement === 'moveRight'){
      alien.moveRight();
    } else {
      alien.moveLeft();
    }
  });
  window.onkeydown = function(e) {
    if (e.keyCode === 37){
      this.bodies[0].moveLeft();
    } else if (e.keyCode === 39) {
      this.bodies[0].moveRight();
    }
  }.bind(this);
};

module.exports = Game;
