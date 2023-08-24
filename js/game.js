let canvas;
let world;
let keyBoard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyBoard);
}

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 39) {
    keyBoard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyBoard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyBoard.UP = true;
  }
  if (event.keyCode == 40) {
    keyBoard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyBoard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyBoard.D = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.keyCode == 39) {
    keyBoard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyBoard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyBoard.UP = false;
  }
  if (event.keyCode == 40) {
    keyBoard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyBoard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyBoard.D = false;
  }
});
