class MiniChicken extends MovableObject {
    IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    height = 40;
    width = 40;
    y = 390;
  
    constructor() {
      super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
  
      this.x = 200 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 1;
  
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
  
      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 200);
    }
  }
  