class Player {

  constructor(scene, x, y, spriteName, name) {
    this.name = name;
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, spriteName);
    this.sprite.setSize(38, 50);
    this.sprite.setCollideWorldBounds(true);
    this.invPosition = 0;
    this.invItems = scene.physics.add.group();
    this.speed =  gameSettings.playerSpeed;
    this.itemMax = 20;
  }

  plusInvItem(playerSprite, item) {
    if (this.invItems.getLength() < this.itemMax) {
    this.scene.items.remove(item);
    //item.removeAllListeners();
    this.invItems.add(item);
    this.invManager();
    }
  }

  invManager() {
    var preX = this.sprite.x;
    var preY = this.sprite.y;
    for (var n = 0; n < this.invItems.getLength(); n++) {
      var temp = this.invItems.getFirstNth(n, true);
      //temp.setVelocity(0);
      temp.setVelocity((preX-temp.x)*10,(preY-temp.y)*10);
      preX = temp.x;
      preY = temp.y;
    }
  }

  moveManager(up, down, left, right) {

    this.sprite.setVelocity(0);

    if (left.isDown) {
      this.sprite.setVelocityX(-this.speed);
      this.sprite.play(this.name + "_left_anim", true);
    }
    else if (right.isDown) {
      this.sprite.setVelocityX(this.speed);
      this.sprite.play(this.name + "_right_anim", true);
    }

    if (down.isDown) {
      this.sprite.setVelocityY(this.speed);
      this.sprite.play(this.name + "_down_anim", true);
    }
    else if (up.isDown) {
      this.sprite.setVelocityY(-this.speed);
      this.sprite.play(this.name + "_up_anim", true);
    }
  }

  plusSpeedUp(playerSprite,speedup) {
    this.speed += 50;
    speedup.destroy();
  }
}