const chai = require('chai');
const assert = chai.assert;

const Bullet = require('../lib/bullet');

describe('Bullet', function() {
  context('default attributes', function() {
    var bullet = new Bullet({ x: 550, y: 550});

    it('should assign an x coordinate', function() {
      assert.equal(bullet.x, 550);
    });

    it('should assign a y coordinate', function() {
      assert.equal(bullet.y, 550);
    });

    it('should assign a width', function(){
      assert.equal(bullet.size.x, 8);
    });

    it('should assign a height', function(){
      assert.equal(bullet.size.y, 8);
    });
  });
});
