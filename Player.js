/** @type {import ("../typings/phaser")}*/

class Player {

  constructor(scene, x, y, spriteName, name) {
    this.name = name;
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, spriteName);
    this.sprite.setSize(20, 20);
    this.sprite.setDepth(2);
    this.sprite.setCollideWorldBounds(true);
    this.invItems = scene.physics.add.group();
    this.speed = gameSettings.playerSpeed;
    this.itemMax = 20;
    this.invCollider;
    this.invItems.removeCallback = this.itemRemoveCallback.bind(this);
  }

  plusInvItem(playerSprite, item) {
    if (this.invItems.getLength() < this.itemMax) {
      this.scene.items.remove(item);
      item.name = "" + this.invItems.getLength();
      item.setSize(10, 10);
      //item.removeAllListeners();
      this.invItems.add(item);

    }
  }

  invManager() {
    if (this.invCollider.active == true) {
      var preX = this.sprite.x;
      var preY = this.sprite.y;
      for (var n = 1; n <= this.invItems.getLength(); n++) {
        var temp = this.invItems.getLastNth(n, true);
        temp.setVelocity((preX - temp.x) * 20, (preY - temp.y) * 20);
        preX = temp.x;
        preY = temp.y;
      }
    }
  }

  moveManager(up, down, left, right) {

    this.sprite.setVelocity(0);

    if (left.isDown) {
      this.sprite.setVelocityX(-this.speed);
      this.sprite.play(this.name + "_left_anim", true);
    } else if (right.isDown) {
      this.sprite.setVelocityX(this.speed);
      this.sprite.play(this.name + "_right_anim", true);
    }

    if (down.isDown) {
      this.sprite.setVelocityY(this.speed);
      this.sprite.play(this.name + "_down_anim", true);
    } else if (up.isDown) {
      this.sprite.setVelocityY(-this.speed);
      this.sprite.play(this.name + "_up_anim", true);
    }
  }

  plusSpeedUp(playerSprite, speedup) {
    this.speed += 20;
    speedup.destroy();
  }

  itemPopUp(playerSprite, item) { // p1 items * p2 sprite => call p1
    this.invCollider.active = false;
    // console.log(this.invCollider)
    for (var k = 1; k <= this.invItems.getLength(); k++) {
      var pItem = this.invItems.getFirstNth(k, true);
      if (item == pItem) {
        // pItem.setRandomPosition(0, 0, game.config.width, game.config.height);
        this.invItems.remove(pItem);

        if (!this.invItems.contains(item)) {
          break;
        }
      }
    }
    this.invCollider.active = true;

  }

  itemRemoveCallback(item) {
    var toX = Math.random() * game.config.width;
    var toY = Math.random() * game.config.height;
    var delX = toX - item.x;
    var delY = toY - item.y;
    var sec = 1;
    item.setVelocity(delX / sec, delY / sec);
    item.setAngularVelocity(1000);
    this.scene.time.delayedCall(1000 * sec, this.setTo.bind(this), [item, toX, toY]);
  }
  setTo(item, toX, toY) {
    item.setVelocity(0);
    item.setRotation(0);
    item.setPosition(toX, toY);
    this.scene.items.add(item);
    item.setCollideWorldBounds(true);
  }
}
/*
var angle = (toY - item.y) / (toX - item.x);
    angle = Math.atan(angle);
    var dist = Math.sqrt((toX - item.x) * (toX - item.x) + (toY - item.y) * (toY - item.y));
    var velX = Math.cos(angle) * (dist * 2);
    var velY = Math.sin(angle) * (dist * 2);
    */