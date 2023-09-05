class Bottle extends CollectableObject {
  IMAGE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
  x = 200 + Math.random() * 2000;
  y = 100;
  width = 150;
  height = 150;

  constructor() {
    super();
    this.loadImage(this.IMAGE);
  }
}
