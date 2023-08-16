class MovableObject {
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  height = 150;
  width = 110;
  x = 120;
  y = 270;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log('Moving right');
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
