window.onload = function() {
  var draw = require('./draw');
  var audio = new Audio('/assets/audio/music.mp3')
  audio.play()
  draw();
};
