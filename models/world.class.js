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
  endboss_music = new Audio('audio/boss_sound.mp3');
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

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.chicken_sound.volume = 0.4;
    this.chicken_sound.play();
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

  checkIfAlive(endboss) {
    if (endboss.health <= 0 && !endboss.dead) {
      endboss.dead = true;
      endboss.health = 0;
      this.character.killedEndboss = true;
    }
  }

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
    item.collect_coin.volume = 0.2;
    item.collect_coin.play();
    setTimeout(() => {
      item.collect_coin.pause();
    }, 400);
    item.remove(this.level.coins);
    this.character.collectedCoins++;
    this.coinBar.setPercentage(this.character.collectedCoins);
  }

  whatToDoWithBottle(item) {
    item.remove(this.level.bottles);
    this.character.collectedBottles++;
    this.bottleBar.setPercentage(this.character.collectedBottles);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_X, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_X, 0);
    //---- Space for fixed objects ----
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
    /*     mo.drawFrame(this.ctx); */
/*     mo.drawFrameTwo(this.ctx); */

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

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
