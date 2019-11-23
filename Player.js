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
    item.setSize(10,10);
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

  itemPopUp(playerSprite,item) { // p1 items * p2 sprite => call p1
    var flag = true;
    for (var k = 0; k < this.invItems.getLength() ;k++) {
      var pItem = this.invItems.getLastNth(k,true);
      if (pItem == item) {
        console.log("!");
        break;
      }
      this.invItems.remove(pItem);
      this.scene.items.add(pItem);
      pItem.setRandomPosition(0, 0, game.config.width, game.config.height);
    }
   // this.invManager();
  }



}