let canvas;
let world;
let keyBoard = new Keyboard();
let isSoundPaused = false;

let StartEndscreen = new Audio('audio/game_music.mp3');
StartEndscreen.volume = 0.2;

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

document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyBoard.LEFT = true;
});

document.getElementById('btnLeft').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyBoard.LEFT = false;
});

document.getElementById('btnRight').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyBoard.RIGHT = true;
});

document.getElementById('btnRight').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyBoard.RIGHT = false;
});

document.getElementById('btnUp').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyBoard.SPACE = true;
});
document.getElementById('btnUp').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyBoard.SPACE = false;
});
document.getElementById('btnBottle').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyBoard.D = true;
});
document.getElementById('btnBottle').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyBoard.D = false;
});

function playMusic() {
  StartEndscreen.play();
  StartEndscreen.addEventListener('ended', () => {
    StartEndscreen.currentTime = 0;
    StartEndscreen.play();
  });
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
  document.getElementById('mobilButtons').classList.remove('mobileButtons');
}

function startGame2() {
  StartEndscreen.pause();
  document.getElementById('overlay').classList.add('d-none');
  document.getElementById('mobilButtons').classList.add('mobileButtons');
  init();
}

function showEndscreen(endboss) {
  stopGame();
  playMusic();
  world.chicken_sound.pause();
  world.character.endboss_music.pause();
  document.getElementById('overlay').classList.remove('d-none');
  document.getElementById('endScreen').classList.remove('d-none');
  document.getElementById('buttons').classList.add('d-none');
  document.getElementById('mobilButtons').classList.remove('mobileButtons');
  document.getElementById('winOrLose').innerHTML = '';
  if (endboss.dead) {
    document.getElementById('winOrLose').innerHTML = 'YOU WIN';
  } else {
    document.getElementById('winOrLose').innerHTML = 'YOU LOSE';
  }
}

function toggleSound() {
  let image = document.getElementById('speaker');
  if (isSoundPaused) {
    world.chicken_sound.play();
    world.character.walking_sound.volume = 0.4;
    world.character.hurt_sound.volume = 0.4;
    world.character.endboss_music.volume = 0.2;
    image.src = 'img/volume.png';
    isSoundPaused = false;
  } else {
    world.chicken_sound.pause();
    world.character.walking_sound.volume = 0;
    world.character.hurt_sound.volume = 0;
    world.character.endboss_music.volume = 0;
    image.src = 'img/mute.png';
    isSoundPaused = true;
  }
}

function stopGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function init() {
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyBoard);
}
