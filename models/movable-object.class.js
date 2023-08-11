class MovableObject {
  x = 120;
  y = 270;
  height = 150;
  width = 110;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log('Moving right');
  }

  moveLeft() {}
}
