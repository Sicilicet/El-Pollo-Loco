class MiniChicken extends MovableObject {
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
  movingLeft = true;
  damage = 1;
  health = 5;
  height = 50;
  width = 40;
  y = 380;

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 1;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.x >= 2200) {
        this.movingLeft = true;
      } else if (this.x <= 0) {
        this.movingLeft = false;
      }

      if (this.movingLeft) {
        this.moveLeft();
        this.otherDirection = false;
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setInterval(() => {
          this.remove(world.level.enemies);
        }, 250);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
