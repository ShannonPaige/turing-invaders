const chai = require('chai');
const assert = chai.assert;

const Alien = require('../lib/alien');

describe('Alien', function() {
  context('default attributes', function() {
    var alien = new Alien({ x: 550, y: 550});

    it('should assign an x coordinate', function() {
      assert.equal(alien.x, 550);
    });

    it('should assign a y coordinate', function() {
      assert.equal(alien.y, 550);
    });

    it('should assign a width', function(){
      assert.equal(alien.size.x, 60);
    });

    it('should assign a height', function(){
      assert.equal(alien.size.y, 60);
    });
  });
});
