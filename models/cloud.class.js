class Cloud extends MovableObject {
  width = 720;
  height = 480;
  y = 0;
  x = 0;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.animate();
    //this.x = Math.random() * 500;
  }

  animate() {
    this.moveLeft();
  }
}
