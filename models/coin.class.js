class Coin extends CollectableObject {
  IMAGE = ['img/8_coin/coin_1.png'];
  x = 200 + Math.random() * 2000;
  y = 150;
  width = 50;
  height = 50;

  constructor() {
    super();
    this.loadImage(this.IMAGE);
  }
}
