class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame"); // 씬 이름 저장하는거.
  }

  preload() {
    // # 1 맵
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(config.width / 2, config.height, 'grass').setScale(25, 3).refreshBody();
    this.platforms.create(config.width / 2, config.height * 2 / 3, 'grass').setScale(4, 0.5).refreshBody();

    this.add.text(20, 20, "Playing game", {
      font: "10px Arial",
      fill: "yellow"
    });

    // # 2 인게임 오브젝트 생성.

    this.items = this.physics.add.group();

    this.player1 = new Player(this, config.width / 2 - 100, config.height / 2, "player1", "p1");
    this.player2 = new Player(this, config.width / 2 + 100, config.height / 2, "player2", "p2");
    this.player1.invCount = 0;
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
    // 충돌 설정.
    this.physics.add.collider(this.platforms, this.items);
  
    this.physics.add.collider(this.player1.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.platforms);

    this.physics.add.collider(this.player1.sprite, this.items, this.player1.plusInvItem.bind(this.player1));
    this.physics.add.collider(this.player2.sprite, this.items, this.player2.plusInvItem.bind(this.player2));

  }
  update() {
    this.player1.moveManager(this.cursorKeys.up,this.cursorKeys.down,
      this.cursorKeys.left,this.cursorKeys.right);
    this.player2.moveManager(this.keyW,this.keyS,this.keyA,this.keyD);
    
    this.player1InventoryDisplay.setText("Player1 Inventory Count  \n" + this.player1.invCount);
    this.player2InventoryDisplay.setText("Player2 Inventory Count  \n" + this.player2.invCount);
    }

}

/*

현재 남겨진 문제.
#1 좌우 방향키와 위아래 키를 같이 누르면 애니메이션이 멈추는 현상.
#2 방향키를 한번 누르면 애니메이션이 계속 재생되는 현상 => isUP으로 해결 가능성 보임.
#3 inventory 구현
*/

