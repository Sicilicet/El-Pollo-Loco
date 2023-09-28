class Bottle extends CollectableObject {
  IMAGE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
  x = 200;
  y = 350;
  width = 80;
  height = 80;

  constructor(x) {
    super();
    this.loadImage(this.IMAGE);
    this.x = x;
  }
}
