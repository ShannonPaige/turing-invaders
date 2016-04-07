const chai = require('chai');
const assert = chai.assert;

const Bullet = require('../lib/bullet');
const Level = require('../lib/level');

describe('Bullet', function() {
  context('default attributes', function() {
    var level = new Level({ x: 600, y: 400}, null, 3);
    var bullet = new Bullet(550, 550, -3, level);

    it('should assign an x coordinate', function() {
      assert.equal(bullet.x, 550);
    });

    it('should assign a y coordinate', function() {
      assert.equal(bullet.y, 550);
    });

    it('should assign a width', function(){
      assert.equal(bullet.size.x, 4);
    });

    it('should assign a height', function(){
      assert.equal(bullet.size.y, 4);
    });

    it('should assign an x velocity', function(){
      assert.equal(bullet.velocity.x, 0);
    });

    it('should assign an y velocity', function(){
      assert.equal(bullet.velocity.y, -3);
    });
  });

  context('updating', function() {
    it('should update its x velocity', function() {
      var level = new Level({ x: 600, y: 400}, null, 3);
      var bullet = new Bullet(550, 550, -3, level);
      bullet.update();
      assert.equal(bullet.x, 550);
    });

    it('should update its y velocity', function() {
      var level = new Level({ x: 600, y: 400}, null, 3);
      var bullet = new Bullet(550, 550, -3, level);
      bullet.update();
      assert.equal(bullet.y, 547);
    });
  });
});
