class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame"); // 씬 이름 저장하는거.
  }

  preload() {
    // # 1 맵
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(gameSettings.blockSize * 6, config.height * 2 / 4, 'block1');
    this.platforms.create(config.width / 2, config.height / 2, 'block2');
    this.platforms.create(config.width * 3 / 8, config.height * 2 / 8, 'block1');
    this.platforms.create(config.width * 6 / 7, config.height * 1 / 4, 'block2');
    this.platforms.create(config.width * 1 / 8, config.height * 5 / 5, 'block1');
    this.platforms.create(config.width * 2 / 3, config.height * 8 / 10, 'block2');
    this.platforms.create(592, 345, 'dol');
    this.platforms.create(875, 560, 'dol');
    this.platforms.create(100, 372, 'pull1');
    this.platforms.create(592, 345, 'pull2');
    this.platforms.create(720, 800, 'suninjang');
    this.platforms.create(528, 8700, 'suninjang');
    this.add.text(20, 20, "Playing game", {
      font: "10px Arial",
      fill: "yellow"
    });

    // # 2 인게임 오브젝트 생성.

    this.items = this.physics.add.group();

    this.player1 = new Player(this, config.width / 2 - 100, config.height / 2, "player1", "p1");

    this.player2 = new Player(this, config.width / 2 + 100, config.height / 2, "player2", "p2");
    this.player2.invPosition = config.width / 2 + 10;

    // # 3 키 바인딩

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  }

  create() {

    this.player1InventoryDisplay = this.add.text(20, 100, "Player1 Inventory Count  \n" + this.player1.invCount, {
      font: "20px Arial",
      fill: "black"
    });

    this.player2InventoryDisplay = this.add.text(1050, 100, "Player2 Inventory Count  \n" + this.player2.invCount, {
      font: "20px Arial",
      fill: "black"
    });


    var maxObjects = 20;

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
      item.setVelocity(100 * (Math.random() - 0.5) * 5, 100 * (Math.random() - 0.5) * 5);
      item.setCollideWorldBounds(true);
      item.setBounce(1);
    }
    // 충돌 설정.

    this.physics.add.collider(this.platforms, this.items);

    this.physics.add.collider(this.player1.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.platforms);

    this.physics.add.collider(this.player1.sprite, this.items, this.player1.plusInvItem.bind(this.player1));
    this.physics.add.collider(this.player2.sprite, this.items, this.player2.plusInvItem.bind(this.player2));

    //this.physics.add.collider(this.player1.sprite, this.player2.invItems,this.player1.itemStealed);
    //this.physics.add.collider(this.player2.sprite, this.player1.invItems,this.player2.itemStealed);
  }
  update() {
    this.player1.moveManager(this.cursorKeys.up, this.cursorKeys.down,
      this.cursorKeys.left, this.cursorKeys.right);
    this.player2.moveManager(this.keyW, this.keyS, this.keyA, this.keyD);

    this.player1InventoryDisplay.setText("Player1 Inventory Count  \n" + this.player1.invItems.getLength());
    this.player2InventoryDisplay.setText("Player2 Inventory Count  \n" + this.player2.invItems.getLength());
    this.player1.invManager();
    this.player2.invManager();
  }

}

/*

현재 남겨진 문제.
#1 좌우 방향키와 위아래 키를 같이 누르면 애니메이션이 멈추는 현상.
#2 방향키를 한번 누르면 애니메이션이 계속 재생되는 현상 => isUP으로 해결 가능성 보임.
#3 inventory 구현
*/

