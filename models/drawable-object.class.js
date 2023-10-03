class DrawableObject {
  x = 120;
  y = 270;
  height = 130;
  width = 110;
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

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof MiniChicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.linewidth = '10';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawFrameTwo(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof MiniChicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.linewidth = '10';
      ctx.strokeStyle = 'green';
      ctx.rect(
        (this.hitboxX = this.x + this.offset.left),
        (this.hitboxY = this.y + this.offset.top),
        (this.hitboxWidth = this.width - (this.offset.left + this.offset.right)),
        (this.hitboxHeight = this.height - this.offset.bottom)
      );
      ctx.stroke();
    }
  }
}
