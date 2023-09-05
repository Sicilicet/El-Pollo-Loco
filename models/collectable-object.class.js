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
}