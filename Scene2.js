class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame"); // 씬 이름 저장하는거.
  }
  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    // config의 너비와 높이가 이미지의 크기로 맞추어져 있다.
    this.background.setOrigin(0, 0); // 원래 pivot이 중간인가보다.
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(config.width / 2, config.height, 'grass').setScale(25, 3).refreshBody();
    this.platforms.create(config.width / 2, config.height * 2 / 3, 'grass').setScale(4, 0.5).refreshBody();

    this.add.text(20, 20, "Playing game", {
      font: "10px Arial",
      fill: "yellow"
    });

    this.items = this.physics.add.group();

    var maxObjects = 10;
    for (var i = 0; i <= maxObjects; i++) {
      var item = this.physics.add.sprite(32, 32, "item_pink");
      this.items.add(item);
      item.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (Math.random() > 0.5) {
        item.play("anim_pink");
      }
      else {
        item.play("anim_green");
      }
      item.setVelocity(100 * (Math.random()-0.5) * 5, 100 * (Math.random()-0.5) * 5);
      item.setCollideWorldBounds(true);
      item.setBounce(1);
    }

    this.player1 = this.physics.add.sprite(config.width / 2 - 100, config.height / 2, "player1");
    this.player1.setCollideWorldBounds(true);

    this.player2 = this.physics.add.sprite(config.width / 2 + 100, config.height / 2, "player2");
    this.player2.setCollideWorldBounds(true);

    this.physics.add.collider(this.platforms, this.items);

    this.physics.add.collider(this.player1, this.platforms);
    this.physics.add.collider(this.player2, this.platforms);

    this.physics.add.collider(this.player1, this.items, this.P1inventoryManager);
    this.physics.add.collider(this.player2, this.items, this.P2inventoryManager);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  }
  update() {
    this.movePlayer1Manager();
    this.movePlayer2Manager();
  }

  movePlayer1Manager() {
    

    this.player1.setVelocity(0);
    
    
    if (this.cursorKeys.left.isDown) {
      this.player1.setVelocityX(-gameSettings.playerSpeed);
      this.player1.play("p1_left_anim", true);
    }
    else if (this.cursorKeys.right.isDown) {
      this.player1.setVelocityX(gameSettings.playerSpeed);
      this.player1.play("p1_right_anim", true);
    }
    if (this.cursorKeys.down.isDown) {
      this.player1.setVelocityY(gameSettings.playerSpeed);
      this.player1.play("p1_down_anim", true);
    }
    else if (this.cursorKeys.up.isDown) {
      this.player1.setVelocityY(-gameSettings.playerSpeed);
      this.player1.play("p1_up_anim", true);
    }
    /*else {
    this.player1.play("p1_turn_anim", true);
   }*/

    /*if (this.spacebar.isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-300);     
      console.log("jump");
    }*/

  }

  movePlayer2Manager() {
    this.player2.setVelocity(0);

    if (this.KeyA.isDown) {
      this.player2.setVelocityX(-gameSettings.playerSpeed);
      this.player2.play("p2_left_anim", true);
    }
    else if (this.KeyD.isDown) {
      this.player2.setVelocityX(gameSettings.playerSpeed);
      this.player2.play("p2_right_anim", true);
    }
    if (this.KeyS.isDown) {
      this.player2.setVelocityY(gameSettings.playerSpeed);
      this.player2.play("p2_down_anim", true);
    }
    else if (this.KeyW.isDown) {
      this.player2.setVelocityY(-gameSettings.playerSpeed);
      this.player2.play("p2_up_anim", true);
    }
    /*{
      this.player2.play("p2_turn_anim", true);
    }*/
  }

  P1inventoryManager(player, item) {
    item.setPosition(10, 100);
    item.setVelocity(0);
  }

  P2inventoryManager(player, item) {
    item.setPosition(1270, 100);
    item.setVelocity(0);
  }
}

/*

현재 남겨진 문제.
#1 좌우 방향키와 위아래 키를 같이 누르면 애니메이션이 멈추는 현상.
#2 방향키를 한번 누르면 애니메이션이 계속 재생되는 현상 => isUP으로 해결 가능성 보임.
#3 inventory 구현
*/

