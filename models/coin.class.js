class Coin extends DrawableObject {

  IMAGE = ['img/8_coin/coin_1.png'];

  constructor() {
    super();
    this.loadImage(this.IMAGE);
    this.x = 200 + Math.random() * 2000;
    this.y = 120;
    this.width = 150;
    this.height = 150;
  }
}
