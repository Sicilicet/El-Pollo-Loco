class Cloud extends MovableObject {
  y = 0;
  x = 0;
  width = 720;
  height = 480;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.animate();
    //this.x = Math.random() * 500;
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
