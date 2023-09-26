let canvas;
let world;
let keyBoard = new Keyboard();

let StartEndscreen = new Audio("audio/game_music.mp3");
StartEndscreen.volume = 0.4;   

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

function playMusic() {
  StartEndscreen.play();
  StartEndscreen.addEventListener("ended", () => {
    StartEndscreen.currentTime = 0;
    StartEndscreen.play();
  })
}

function showOptions() {
  playMusic();
  document.getElementById('overlay').classList.remove('d-none');
  document.getElementById('buttons').classList.remove('d-none');
  document.getElementById('controls').classList.add('d-none');
  document.getElementById('startscreen').classList.add('d-none');
  document.getElementById('backwards').classList.add('d-none');
}

function newGame() {
  document.getElementById('overlay').classList.add('d-none');
  document.getElementById('endScreen').classList.add('d-none');
  StartEndscreen.play();
  window.location.reload();
}

function showControls() {
  document.getElementById('controls').classList.remove('d-none');
  document.getElementById('buttons').classList.add('d-none');
  document.getElementById('backwards').classList.remove('d-none');
  //document.getElementById('mobilButtons').classList.remove("mobile-buttons");
}

function startGame2() {
  StartEndscreen.pause();
  document.getElementById('overlay').classList.add('d-none');
  //document.getElementById('mobilButtons').classList.add("mobile-buttons");
  init();
}

function init() {
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyBoard);
}
