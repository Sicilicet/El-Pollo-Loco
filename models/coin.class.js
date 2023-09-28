class Coin extends CollectableObject {
  IMAGE = ['img/8_coin/coin_1.png'];
  x = 200
  y = 150;
  width = 50;
  height = 50;
  collect_coin = new Audio('audio/collect_coin.mp3');

  constructor(x) {
    super();
    this.loadImage(this.IMAGE);
    this.x = x;
  }
}
