var Game = function(context, tank) {
  Game.prototype.drawTank(context, tank);
}

Game.prototype.drawTank = function (context, tank) {
  context.fillRect(tank.x, tank.y, tank.width, tank.height);
  // return this;
};

module.exports = Game;
