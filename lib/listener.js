var Listener = function(){
  var keyState = {};

  window.onkeydown = function(e) {
    var key = e.keyCode
    this.keyState.key = true;
    // this.keyState[e.keyCode] = true;
  };

  window.onkeyup = function(e) {
    var key = e.keyCode
    this.keyState.key = false;
    // this.keyState[e.keyCode] = false;
  };

  this.isDown = function(keyCode){
    return this.keyState.keyCode === true;
    // return this.keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 }
}

module.exports = Listener;
