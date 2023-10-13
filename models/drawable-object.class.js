class DrawableObject {
  hitboxY;
  hitboxX;
  hitboxWidth;
  hitboxHeight;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads images from the provided array of file paths and caches them for future use.
   * @param {string[]} arr - An array of file paths representing the images to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
