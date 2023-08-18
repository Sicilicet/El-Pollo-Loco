class Character extends MovableObject {
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];
  height = 280;
  speed = 8;
  y = 155;
  world;
  //walking_sound = new Audio("audio/name");

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      //this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_X) {
        this.x += this.speed;
        this.otherDirection = false;
        //this.walking_sound.play();
      }
      this.world.camera_X = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.LEFT && this.x >= 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        //this.walking_sound.play();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
  jump() {}
}
