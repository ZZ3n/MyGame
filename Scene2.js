/** @type {import ("../typings/phaser")}*/

class Scene2 extends Phaser.Scene {
  constructor() {
    super( {
      key: "playGame",
      visible : false,
      active : false
    });
    
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
    // # 2-1 그룹 생성
    this.items = this.physics.add.group();
    this.speedups = this.physics.add.group();
    // # 2-2 플레이어 객체 생성.
    this.player1 = new Player(this, config.width / 2 - 100, config.height / 2 - 100, "player1", "p1");
    this.player2 = new Player(this, config.width / 2 + 100, config.height / 2 - 100, "player2", "p2");
    this.tornado = new Player(this, config.width / 2, config.height / 4, "tornado","tornado");
    this.house1 = this.physics.add.staticSprite(100,100,"house1");
    this.house1Stock = 0;
    this.house2 = this.physics.add.staticSprite(config.width - 100, config.height - 100,"house2");
    this.house2Stock = 0;
    this.house2.itemMax = 40;
    //tornado constructor
    this.tornado.sprite.play("anim_tornado", true);
    this.tornado.sprite.setScale(2,2);
    // # 3 키 바인딩

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  create() {

    var maxObjects = 15;

    for (var i = 0; i <= maxObjects; i++) {
      this.plusItemInScene();
    }
    this.timedItemEvent = this.time.addEvent({
      delay: 200,
      callbackScope: this,
      callback: this.plusItemInScene,
      loop: true
      //startAt : 1000
    });
    var speedUpCount = 10;

    for (i = 0; i <= speedUpCount; i++) {
      var item = this.physics.add.sprite(32, 32, "speedup");
      this.speedups.add(item);
      item.setRandomPosition(0, 0, game.config.width, game.config.height);
      item.setVelocity(0);
      item.setCollideWorldBounds(true);
      item.setBounce(1);
    }

    this.player1InventoryDisplay = this.add.text(20, 100, "" + this.player1.invItems.getLength() + '/' + this.player1.itemMax, {
      font: "25px Arial",
      fill: "black"
    });

    this.player2InventoryDisplay = this.add.text(1000, 100, "" + this.player2.invItems.getLength() + '/' + this.player2.itemMax, {
      font: "25px Arial",
      fill: "black"
    });

    this.house1Display = this.add.text(this.house1.x - 32,this.house1.y + 40,"" + this.house1Stock + '/' + gameSettings.maxStock, {
      font : "30px seriff",
      fill : "black"
    });
    this.house2Display = this.add.text(this.house2.x - 32,this.house2.y + 40,"" + this.house2Stock + '/' + gameSettings.maxStock, {
      font : "30px seriff",
      fill : "black"
    });



    // 충돌 설정.
    this.physics.add.collider(this.platforms, this.items);

    this.physics.add.collider(this.player1.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.platforms);

    this.physics.add.collider(this.player1.sprite, this.items, this.player1.plusInvItem.bind(this.player1));
    this.physics.add.collider(this.player2.sprite, this.items, this.player2.plusInvItem.bind(this.player2));

    this.physics.add.collider(this.player1.sprite, this.speedups, this.player1.plusSpeedUp.bind(this.player1));
    this.physics.add.collider(this.player2.sprite, this.speedups, this.player2.plusSpeedUp.bind(this.player2));

    this.player2.invCollider = this.physics.add.collider(this.player1.sprite, this.player2.invItems, this.player2.itemPopUp.bind(this.player2));
    this.player1.invCollider = this.physics.add.collider(this.player2.sprite, this.player1.invItems, this.player1.itemPopUp.bind(this.player1));
    this.physics.add.collider(this.tornado.sprite, this.player1.invItems, this.player1.itemPopUp.bind(this.player1));
    this.physics.add.collider(this.tornado.sprite, this.player2.invItems, this.player2.itemPopUp.bind(this.player2));

    this.physics.add.collider(this.player2.sprite, this.house1, this.storeToHouse1.bind(this)); //##$#$
    this.physics.add.collider(this.player1.sprite, this.house2, this.storeToHouse2.bind(this)); //#$@!#

    this.tornado.sprite.setBounce(2);
    this.tornado.sprite.setCollideWorldBounds(true);
    this.tornado.sprite.setVelocity(400,400);
    this.tornado.sprite.setMaxVelocity(400,400);
  }
  update() {
    this.player1.moveManager(this.cursorKeys.up, this.cursorKeys.down,
      this.cursorKeys.left, this.cursorKeys.right);
    this.player2.moveManager(this.keyW, this.keyS, this.keyA, this.keyD);
    this.player1InventoryDisplay.setText("" + this.player1.invItems.getLength() + '/' + this.player1.itemMax);
    this.player2InventoryDisplay.setText("" + this.player2.invItems.getLength() + '/' + this.player2.itemMax);
    this.player1InventoryDisplay.setPosition(this.player1.sprite.x + 20, this.player1.sprite.y);
    this.player2InventoryDisplay.setPosition(this.player2.sprite.x + 20, this.player2.sprite.y);
    this.house1Display.setText("" + this.house1Stock + '/' + gameSettings.maxStock);
    this.house2Display.setText("" + this.house2Stock + '/' + gameSettings.maxStock);
    this.player1.invManager();
    this.player2.invManager();
    //console.log(this.items.getLength());
    if (this.items.getLength() >= 30) {
      this.timedItemEvent.paused = true;
    } else {
      this.timedItemEvent.paused = false;
    }
    if (this.house1Stock >= gameSettings.maxStock || this.house2Stock >= gameSettings.maxStock) {
      super.active = false;
      this.scene.start("endGame");
    }
      //ending
  }

  plusItemInScene() {
    var item = this.physics.add.sprite(32, 32, "item_pink");
    this.items.add(item);
    item.setRandomPosition(0, 0, game.config.width, game.config.height);
    if (Math.random() > 0.5) {
      item.play("anim_pink");
    } else {
      item.play("anim_green");
    }
    item.setCollideWorldBounds(true);
  }

  storeToHouse1(player2Sprite,House1Sprite) {
    console.log(this);
    this.house1Stock = this.house1Stock +  this.player2.invItems.getLength();
    console.log(this.house1Stock);
    this.player2.invItems.clear(false,true);
  }

  storeToHouse2(player1Sprite,House2Sprite) {
    console.log(this);
    this.house2Stock = this.house2Stock +  this.player1.invItems.getLength();
    console.log(this.house2Stock);
    this.player1.invItems.clear(false,true);
  }
}

/*

현재 남겨진 문제.
#1 좌우 방향키와 위아래 키를 같이 누르면 애니메이션이 멈추는 현상.
#2 방향키를 한번 누르면 애니메이션이 계속 재생되는 현상 => isUP으로 해결 가능성 보임.
*/