const chai = require('chai');
const assert = chai.assert;

const Tank = require('../lib/tank');

describe('Tank', function() {
  context('default attributes', function() {
    var tank = new Tank({ x: 1200, y: 600});

    it('should assign an x coordinate', function() {
      assert.equal(tank.x, 550);
    });

    it('should assign a y coordinate', function() {
      assert.equal(tank.y, 550);
    });

    it('should assign a width', function(){
      assert.equal(tank.size.x, 100);
    });

    it('should assign a height', function(){
      assert.equal(tank.size.y, 50);
    });
  });
});
