class MovableObject extends DrawableObject {
  otherDirection = false;
  speed = 0.15;
  speedY = 0;
  acceleration = 2;
  health = 100;
  lastHit = 0;
  isFalling = false;
  endboss_music = new Audio('audio/boss_sound.mp3');

  /**
   * Simulates gravity and updates the vertical position and speed of an object.
   * This method is intended to be called periodically to apply gravity to the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground or falling.
   * @returns {boolean} Returns `true` if the object is above the ground or if it's an instance of ThrowableObject, otherwise `false`.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      this.isFalling = true;
      return this.y < 235;
    }
  }

  /**
   * Determines the hitbox X-coordinate for the given moving object based on the current direction.
   * @param {MovingObject} mo - The moving object for which the hitbox X-coordinate needs to be determined.
   */
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

  /**
   * Defines the hitbox dimensions for the current object and another object to check for collisions.
   * @param {Object} mo - The object for which the hitbox dimensions need to be calculated.
   * @property {Object} mo.offset - The offset values for the object's hitbox (top, left, right, bottom).
   */
  hitbox(mo) {
    this.hitboxY = this.y + this.offset.top;
    this.hitboxWidth = this.width - (this.offset.left + this.offset.right);
    this.hitboxHeight = this.height - this.offset.bottom;
    mo.hitboxY = mo.y + mo.offset.top;
    mo.hitboxWidth = mo.width - (mo.offset.left + mo.offset.right);
    mo.hitboxHeight = mo.height - mo.offset.bottom;
  }

  /**
   * Checks whether the current object is colliding with another object based on their hitboxes.
   * @param {Object} mo - The object to check for collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.hitboxX + this.hitboxWidth > mo.hitboxX &&
      this.hitboxX < mo.hitboxX + mo.hitboxWidth &&
      this.hitboxY + this.hitboxHeight > mo.hitboxY &&
      this.hitboxY < mo.hitboxY + mo.hitboxHeight
    );
  }

  /**
   * Reduces the health of the target object based on the damage inflicted by a missile.
   * @param {Object} mo - The missile object containing damage information.
   * @param {number} mo.damage - The amount of damage inflicted by the missile.
   */
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

  /**
   * Checks if the object is hurt based on the time elapsed since the last hit.
   * @returns {boolean} Returns true if the object was hit within the last second, false otherwise.
   */
  isHurt() {
    let timespassed = new Date().getTime() - this.lastHit;
    timespassed = timespassed / 1000;
    return timespassed < 1;
  }

  isDead() {
    return this.health == 0;
  }

  /**
   * Removes the specified object from the provided array.
   * @param {Array} object - The array from which the object needs to be removed.
   */
  removeObject(object) {
    let index = object.indexOf(this);
    if (index !== -1) {
      object.splice(index, 1);
    }
  }

  /**
   * Plays an animation using a sequence of images.
   * @param {string[]} images - An array of strings representing the paths to the images in the animation sequence.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Handles the logic for triggering the end boss encounter when the character's X-coordinate is at 2000.
   * If the end boss has not been added and the character's X-coordinate is 2000, it sets the trigger flag,
   * adds the end boss, and plays the end boss music.
   */
  helloEndboss() {
    if (!this.endbossAdded && this.world.character.x === 2000) {
      this.triggerd_boss = true;
      this.endbossAdded = true;
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
