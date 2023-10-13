class World {
  level = level1;
  character = new Character();
  camera_X = -1000;
  keyboard;
  canvas;
  ctx;
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar = new EnbossBar();
  throwableObjects = [];
  chicken_sound = new Audio('audio/chickens.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.runThrowAbleObjects();
  }

  /**
   * Sets the world property of the character to the current instance.
   * This method establishes the connection between the character and the world it belongs to.
   */
  setWorld() {
    this.character.world = this;
  }

  run() {
    this.playBackgroundSound();
    setInterval(() => {
      this.checkCollisions();
    }, 70);
  }

  runThrowAbleObjects() {
    setInterval(() => {
      this.endbossIsHitByBottle();
      this.checkThrowObjects();
    }, 160);
  }

  checkCollisions() {
    this.checkCollisionsEnemy();
    this.checkCollisionItem();
  }

  /**
   * Checks if the 'D' key is pressed and the character has collected bottles.
   * If conditions are met, creates a new throwable object at the character's position,
   * decrements the collected bottles count, and updates the bottle bar percentage.
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.character.collectedBottles > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.character.collectedBottles--;
        this.bottleBar.setPercentage(this.character.collectedBottles);
      } else if (this.character.collectedBottles <= 0) {
        this.character.collectedBottles == 0;
      }
    }
  }

  /**
   * Checks collisions between the character and enemies in the game.
   * Detects if the character collides with enemies, handles collisions based on different scenarios,
   * and updates the character's health and enemy states accordingly.
   */
  checkCollisionsEnemy() {
    let allEnemyTypes = [this.level.enemies, this.level.endboss];
    allEnemyTypes.forEach((allEnemy) => {
      allEnemy.forEach((enemy) => {
        this.character.whichDirection(enemy);
        this.character.hitbox(enemy);
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY <= 0 && !enemy.isDead()) {
          if (enemy instanceof Chicken || enemy instanceof MiniChicken) {
            enemy.hit(this.character);
          }
        } else if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead()) {
          this.character.hit(enemy);
          this.healthBar.setPercentage(this.character.health);
        }
      });
    });
  }

  /**
   * Checks if the end boss is hit by a thrown bottle and handles the collision logic.
   * Iterates through the end boss and throwable objects arrays to detect collisions.
   * If a collision is detected, the end boss is damaged by the bottle and its health is updated.
   */
  endbossIsHitByBottle() {
    this.level.endboss.forEach((endboss) => {
      this.checkIfAlive(endboss);
      this.throwableObjects.forEach((bottle) => {
        bottle.whichDirection(endboss);
        bottle.hitbox(endboss);
        if (bottle.isColliding(endboss)) {
          endboss.hit(bottle);
          this.endbossBar.setPercentage(endboss.health);
        }
      });
    });
  }

  /**
   * Checks if the end boss is alive or not based on their health.
   * @param {object} endboss - The end boss object containing health and dead status.
   * If the end boss's health is less than or equal to 0 and the end boss is not already dead,
   * updates the end boss's status to dead, sets their health to 0, and marks the character as having killed the end boss.
   */
  checkIfAlive(endboss) {
    if (endboss.health <= 0 && !endboss.dead) {
      endboss.dead = true;
      endboss.health = 0;
      this.character.killedEndboss = true;
    }
  }

  /**
   * Checks for collisions between the character and collectable items (coins and bottles) in the level.
   * Iterates through the collectable items, determines collision, and triggers appropriate actions.
   */
  checkCollisionItem() {
    if (this.character) {
      let collectableItems = [this.level.coins, this.level.bottles];
      collectableItems.forEach((allItems) => {
        allItems.forEach((item) => {
          this.character.whichDirection(item);
          this.character.hitbox(item);
          if (this.character.isColliding(item)) {
            if (item instanceof Coin) {
              this.whatToDoWithCoin(item);
            } else {
              this.whatToDoWithBottle(item);
            }
          }
        });
      });
    }
  }

  whatToDoWithCoin(item) {
    if (isSoundPaused) {
      item.collect_coin.volume = 0;
    } else {
      item.collect_coin.volume = 0.2;
    }
    item.collect_coin.play();
    setTimeout(() => {
      item.collect_coin.pause();
    }, 400);
    item.removeObject(this.level.coins);
    this.character.collectedCoins++;
    this.coinBar.setPercentage(this.character.collectedCoins);
  }

  whatToDoWithBottle(item) {
    item.removeObject(this.level.bottles);
    this.character.collectedBottles++;
    this.bottleBar.setPercentage(this.character.collectedBottles);
  }

  playBackgroundSound() {
    this.chicken_sound.volume = 0.4;
    this.chicken_sound.play();
    this.chicken_sound.addEventListener('ended', () => {
      this.chicken_sound.currentTime = 0;
      this.chicken_sound.play();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_X, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_X, 0);
    this.drawEnbossBar();
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_X, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_X, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawEnbossBar() {
    if (this.character.triggerd_boss) {
      this.addToMap(this.endbossBar);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the given image horizontally.
   * @param {Object} mo - The image object to be flipped.
   * @property {CanvasRenderingContext2D} this.ctx - The 2D rendering context of the canvas.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
