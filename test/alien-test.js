const chai = require('chai');
const assert = chai.assert;

const Alien = require('../lib/alien');

describe('Alien', function() {
  context('default attributes', function() {
    var alien = new Alien({ x: 550, y: 550}, 0, 1);

    it('should assign an x coordinate', function() {
      assert.equal(alien.x, 550);
    });

    it('should assign a y coordinate', function() {
      assert.equal(alien.y, 550);
    });

    it('should assign a width', function(){
      assert.equal(alien.size.x, 30);
    });

    it('should assign a height', function(){
      assert.equal(alien.size.y, 30);
    });

    it('should assign a patrol', function(){
      assert.equal(alien.patrol, 0);
    });

    it('should assign two default images', function(){
      assert.equal(alien.alien_image[0].src, "http://localhost:8080/assets/images/alien-0-0.png");
      assert.equal(alien.alien_image[1].src, "http://localhost:8080/assets/images/alien-0-1.png");
    });

    it('should assign a speed', function(){
      assert.equal(alien.speed, 1);
    });
  });

  context('moving', function() {
    it('should move right', function() {
      var alien = new Alien({ x: 50, y: 50}, 0, 1);
      alien.moveRight();
      assert.equal(alien.x, 51);
    });

    it('should move left', function() {
      var alien = new Alien({ x: 50, y: 50}, 0, 1);
      alien.moveLeft();
      assert.equal(alien.x, 49);
    });
  });

  context('updating', function() {
    it('should switch direction if it hits the left side', function() {
      var alien = new Alien({ x: 50, y: 50}, 0, 1);
      alien.patrol = -1;
      alien.updateSpeed();
      assert.equal(alien.speed, -1);
    });

    it('should switch direction if it hits the right side', function() {
      var alien = new Alien({ x: 50, y: 50}, 0, -1);
      alien.patrol = 151;
      alien.updateSpeed();
      assert.equal(alien.speed, 1);
    });

    it('updates its location', function() {
      var alien = new Alien({ x: 50, y: 50}, 0, 1);
      alien.update();
      assert.equal(alien.x, 51);
    });

    it('updates its patrol', function() {
      var alien = new Alien({ x: 50, y: 50}, 0, 1);
      alien.update();
      assert.equal(alien.patrol, 1);
    });
  });
});
