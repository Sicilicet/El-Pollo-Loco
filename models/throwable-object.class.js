class ThrowableObject extends MovableObject {
  damage = 4;
  isFlying = true;
  isBroken = false;
  speedY = 20;
  height = 80;
  width = 70;
  throw_sound = new Audio('audio/throw.mp3');
  break_sound = new Audio('audio/break_bottle.m4a');

  BREAK_BOTTLE = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y) {
    super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
    this.loadImages(this.BREAK_BOTTLE);
    this.x = x;
    this.y = y;
    this.throw();
  }

  throw() {
    this.applyGravity();
    setInterval(() => {
      this.throwBottle();
    }, 1000 / 60);
    setInterval(() => {
      this.bottleSounds();
    }, 100);
  }

  throwBottle() {
    if (this.isFlying) {
      this.x += 7;
    }
    if (this.isFlying && this.y + this.height >= 420) {
      this.isFlying = false;
    }
  }

  bottleSounds() {
    if (this.isFlying) {
      this.throw_sound.volume = 0.2;
      this.throw_sound.play();
    }
    if (!this.isFlying) {
      this.throw_sound.pause();
      if (!this.isBroken) {
        this.break_sound.volume = 0.2;
        this.break_sound.play();
        this.isBroken = true;
        this.playAnimation(this.BREAK_BOTTLE);
      }
    }
  }
}
