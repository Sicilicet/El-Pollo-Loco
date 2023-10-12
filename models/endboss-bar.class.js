class EnbossBar extends DrawableObject {
  IMAGES_BOSSBAR = [
    'img/7_statusbars/2_statusbar_endboss/0_Hahn.png',
    'img/7_statusbars/2_statusbar_endboss/20_Hahn.png',
    'img/7_statusbars/2_statusbar_endboss/40_Hahn.png',
    'img/7_statusbars/2_statusbar_endboss/60_Hahn.png',
    'img/7_statusbars/2_statusbar_endboss/80_Hahn.png',
    'img/7_statusbars/2_statusbar_endboss/100_Hahn.png',
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSSBAR);
    this.x = 480;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES_BOSSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
