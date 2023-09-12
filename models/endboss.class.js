class Endboss extends MovableObject {
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ALERTING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  IMAGES_ATTACKING = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_HURTING = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  height = 500;
  width = 450;
  y = -40;
  alerted = false;
  attacking = false;
  attacked = false;
  dead = false;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERTING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURTING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2350;
    this.speed = 2;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking();
    }, 1000 / 60);
    setInterval(() => {
      this.animations();
    }, 200);
  }

  walking() {
    if (!this.alerted && !this.attacking && !this.isDead()) {
      this.moveLeft();
    }
    if (this.isDead()) {
      //this.endboss_coming.pause();
      this.Damage = 0;
      //setTimeout(() => {
      //  showEndscreen(this);
      // }, 2000);
    }
  }

  animations() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt() && !this.isDead()) {
      this.playAnimation(this.IMAGES_HURTING);
    } else if (!this.alerted && !this.attacking && !this.isDead() && !this.isHurt()) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.alerted && !this.attacking && !this.isDead() && !this.isHurt()) {
      this.playAnimation(this.IMAGES_ALERTING);
    } else if (this.attacking && !this.alerted && !this.isDead() && !this.isHurt()) {
      this.playAnimation(this.IMAGES_ATTACKING);
    }
  }
}
