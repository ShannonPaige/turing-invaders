const chai = require('chai');
const assert = chai.assert;

const Tank = require('../lib/tank');

describe('Tank', function() {
  context('default attributes', function() {
    var tank = new Tank({ x: 600, y: 400});

    it('should assign an x coordinate', function() {
      assert.equal(tank.x, 244.5);
    });

    it('should assign a y coordinate', function() {
      assert.equal(tank.y, 375);
    });

    it('should assign a width', function(){
      assert.equal(tank.size.x, 111);
    });

    it('should assign a height', function(){
      assert.equal(tank.size.y, 25);
    });

    it('should assign a default image', function(){
      assert.equal(tank.image.src, "http://localhost:8080/assets/images/tank.png");
    });
  });

  context('moving', function() {
    it('should move right', function() {
      var tank = new Tank({ x: 600, y: 400});
      tank.moveRight();
      assert.equal(tank.x, 249.5);
    });

    it('should move left', function() {
      var tank = new Tank({ x: 600, y: 400});
      tank.moveLeft();
      assert.equal(tank.x, 239.5);
    });
  });
});
