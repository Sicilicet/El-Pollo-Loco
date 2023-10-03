class Bottle extends CollectableObject {
  IMAGE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
  x = 200;
  y = 350;
  width = 80;
  height = 80;
  offset = {
    top: 20,
    left: 40,
    right: 20,
    bottom: 30,
  };

  constructor(x) {
    super();
    this.loadImage(this.IMAGE);
    this.x = x;
  }
}
