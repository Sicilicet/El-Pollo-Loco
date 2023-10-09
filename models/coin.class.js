class Coin extends CollectableObject {
  IMAGE = ['img/8_coin/coin_1.png'];
  x = 200;
  y = 150;
  width = 50;
  height = 50;
  offset = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 20,
  };
  collect_coin = new Audio('audio/collect_coin.mp3');

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGE);
    this.x = x;
    this.y = y;
  }
}
