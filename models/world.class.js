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
    setInterval(() => {
      this.checkCollisions();
    }, 70);
  }

  runThrowAbleObjects() {
    setInterval(() => {
      this.endbossIsHitByBottle();
      this.checkThrowObjects();
    }, 150);
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
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead()) {
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
        if (bottle.isColliding(endboss)) {
          endboss.hit(bottle);
          console.log(endboss.health);
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
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.endbossBar);
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
    mo.drawFrame(this.ctx);

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
