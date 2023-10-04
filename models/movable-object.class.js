class MovableObject extends DrawableObject {
  otherDirection = false;
  speed = 0.15;
  speedY = 0;
  acceleration = 2;
  health = 100;
  lastHit = 0;
  isFalling = false;
  endboss_music = new Audio('audio/boss_sound.mp3');

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      this.isFalling = true;
      return this.y < 235;
    }
  }

  whichDirection(mo) {
    if (this.otherDirection) {
      this.hitboxX = this.x + this.offset.right;
      mo.hitboxX = mo.x + mo.offset.left;
    } else if (mo.otherDirection) {
      this.hitboxX = this.x + this.offset.left;
      mo.hitboxX = mo.x + mo.offset.right;
    } else if (this.otherDirection && mo.otherDirection) {
      this.hitboxX = this.x + this.offset.right;
      mo.hitboxX = mo.x + mo.offset.right;
    } else {
      this.hitboxX = this.x + this.offset.left;
      mo.hitboxX = mo.x + mo.offset.left;
    }
  }

  hitbox(mo) {
    this.hitboxY = this.y + this.offset.top;
    this.hitboxWidth = this.width - (this.offset.left + this.offset.right);
    this.hitboxHeight = this.height - this.offset.bottom;
    mo.hitboxY = mo.y + mo.offset.top;
    mo.hitboxWidth = mo.width - (mo.offset.left + mo.offset.right);
    mo.hitboxHeight = mo.height - mo.offset.bottom;
  }

  isColliding(mo) {
    return (
      this.hitboxX + this.hitboxWidth > mo.hitboxX &&
      this.hitboxX < mo.hitboxX + mo.hitboxWidth &&
      this.hitboxY + this.hitboxHeight > mo.hitboxY &&
      this.hitboxY < mo.hitboxY + mo.hitboxHeight
    );
  }

  hit(mo) {
    if (mo.damage > 0) {
      this.health -= mo.damage;
      if (this.health < 0) {
        this.health = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  isHurt() {
    let timespassed = new Date().getTime() - this.lastHit; //Difference in millisecond
    timespassed = timespassed / 1000; //Difference in second
    return timespassed < 1;
  }

  isDead() {
    return this.health == 0;
  }

  remove(object) {
    let index = object.indexOf(this);
    if (index !== -1) {
      object.splice(index, 1);
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  helloEndboss() {
    if (!this.endbossAdded && this.world.character.x === 2000) {
      this.triggerd_boss = true;
      this.endbossAdded = true;
      this.endboss_music.volume = 0.2;
      this.endboss_music.play();
      world.level.endboss.push(new Endboss());
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }
}
