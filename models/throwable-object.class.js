class ThrowableObject extends MovableObject {
  damage = 4;
  constructor(x, y) {
    super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 70;
    this.throw();
  }

  throw_sound = new Audio('audio/throw.mp3');

  throw() {
    this.throw_sound.volume = 0.2;
    this.throw_sound.play();
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
