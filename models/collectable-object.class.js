class CollectableObject extends MovableObject {
    x;
    y;
    width;
    height;

    drawFrame(ctx) {
        if (this instanceof Coin || this instanceof Bottle) {
          ctx.beginPath();
          ctx.linewidth = '10';
          ctx.strokeStyle = 'red';
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
        }
      }

      drawFrameTwo(ctx) {
        if (this instanceof Coin || this instanceof Bottle) {
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