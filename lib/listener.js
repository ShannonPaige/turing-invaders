var Listener = function(){
  var keyState = {};

  window.onkeydown = function(e) {
    debugger;
    keyState[e.keyCode] = true;
  };

  window.onkeyup = function(e) {
    keyState[e.keyCode] = false;
  };

  this.isDown = function(keyCode){
    debugger;
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 }
}

module.exports = Listener;
