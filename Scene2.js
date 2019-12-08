/** @type {import ("../typings/phaser")}*/

class Scene2 extends Phaser.Scene {
  constructor() {
    super({
      key: "playGame",
      visible: false,
      active: false
    });

  }
  init(data) {
    console.log(data.map + " selected");
    this.mapName = data.map;
  }
  preload() {
    console.log("Game Started");
    // # 1 맵
    this.platforms = this.physics.add.staticGroup();
    this.map = new GameMap(this, this.mapName);
    this.add.text(20, 20, "Playing game", {
      font: "10px Arial",
      fill: "yellow"
    });

    // # 2 인게임 오브젝트 생성.
    // # 2-1 그룹 생성
    this.items = this.physics.add.group();
    this.speedups = this.physics.add.group();
    // # 2-2 플레이어 객체 생성.
    this.player1 = new Player(this, 160, 160, "player1", "p1");
    this.player2 = new Player(this, config.width - 160, config.height - 160, "player2", "p2");
    this.tornado = new Player(this, config.width / 2, config.height / 2, "tornado", "tornado");
    this.house1 = this.physics.add.staticSprite(100, 100, "house1");
    this.house1Stock = 0;
    this.house2 = this.physics.add.staticSprite(config.width - 100, config.height - 100, "house2");
    this.house2Stock = 0;
    this.house2.itemMax = 40;
    //Tornado constructor
    this.tornado.sprite.play("anim_tornado", true);
    this.tornado.sprite.setScale(2, 2);
    this.tornado.sprite.setCollideWorldBounds(true);
    var angle = Math.random() * 2 * Math.PI;
    var ix = Math.cos(angle);
    var iy = Math.sin(angle);
    this.tornado.sprite.setBounce(1.17, 1.17);
    this.tornado.sprite.setVelocity(200 * ix, 200 * iy);
    this.tornado.sprite.setMaxVelocity(1000, 1000);
    console.log("Tornado Velocity [ %d,%d ]", 200 * ix, 200 * iy);
    // # 3 키 바인딩

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  create() {
    //##############################################33
    //for debug
    this.timedItemEvent = this.time.addEvent({
      delay: 1500,
      callbackScope: this,
      callbackContext: this,
      callback: function () {
        var x = this.tornado.sprite.body.velocity.x;
        var y = this.tornado.sprite.body.velocity.y;
        console.log("Tornado Velocity [ %d,%d ]", x, y);
      },
      loop: true
      //startAt : 1000
    });
    //##############################################33

    for (var i = 0; i <= gameSettings.maxObjects; i++) {
      this.plusItemInScene();
    }
    this.timedItemEvent = this.time.addEvent({
      delay: 1500,
      callbackScope: this,
      callback: this.plusItemInScene,
      loop: true
      //startAt : 1000
    });

    for (i = 0; i <= gameSettings.speedUpMax; i++) {
      var item = this.physics.add.sprite(32, 32, "speedup");
      this.speedups.add(item);
      item.setRandomPosition(0, 0, game.config.width, game.config.height);
      item.setVelocity(0);
      item.setCollideWorldBounds(true);
      item.setBounce(1);
    }
    // TEXT DISPLAYS
    this.player1InventoryDisplay = this.add.text(20, 100, "" + this.player1.invItems.getLength() + '/' + this.player1.itemMax, {
      font: "25px Arial",
      fill: "black"
    });

    this.player2InventoryDisplay = this.add.text(1000, 100, "" + this.player2.invItems.getLength() + '/' + this.player2.itemMax, {
      font: "25px Arial",
      fill: "black"
    });

    this.house1Display = this.add.text(this.house1.x - 32, this.house1.y + 40, "" + this.house1Stock + '/' + gameSettings.maxStock, {
      font: "30px seriff",
      fill: "black"
    });
    this.house2Display = this.add.text(this.house2.x - 32, this.house2.y + 40, "" + this.house2Stock + '/' + gameSettings.maxStock, {
      font: "30px seriff",
      fill: "black"
    });



    // 충돌 설정.
    // 플랫폼과 아이템s (재배치 위함.)
    this.physics.add.overlap(this.platforms, this.speedups, this.mySetRandomPosition.bind(this));
    this.physics.add.overlap(this.platforms, this.items, this.mySetRandomPosition.bind(this));
    //플레이어와 플랫폼
    this.physics.add.collider(this.player1.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.platforms);
    //플레이어와 아이템
    this.physics.add.overlap(this.player1.sprite, this.items, this.player1.plusInvItem.bind(this.player1));
    this.physics.add.overlap(this.player2.sprite, this.items, this.player2.plusInvItem.bind(this.player2));
    //플레이어와 스피드업
    this.physics.add.overlap(this.player1.sprite, this.speedups, this.player1.plusSpeedUp.bind(this.player1));
    this.physics.add.overlap(this.player2.sprite, this.speedups, this.player2.plusSpeedUp.bind(this.player2));
    //플레이어와 상대 플레이어의 아이템
    this.player2.invCollider = this.physics.add.collider(this.player1.sprite, this.player2.invItems, this.player2.itemPopUp.bind(this.player2));
    this.player1.invCollider = this.physics.add.collider(this.player2.sprite, this.player1.invItems, this.player1.itemPopUp.bind(this.player1));
    //토네이도와 플레이어
    this.physics.add.overlap(this.tornado.sprite, this.player1.invItems, this.player1.itemPopUp.bind(this.player1));
    this.physics.add.overlap(this.tornado.sprite, this.player2.invItems, this.player2.itemPopUp.bind(this.player2));
    //플레이어와 상대 집.
    this.physics.add.collider(this.player2.sprite, this.house1, this.storeToHouse1.bind(this)); //##$#$
    this.physics.add.collider(this.player1.sprite, this.house2, this.storeToHouse2.bind(this)); //#$@!#
    //플레이와 자기 집. // 아직 아무 일 없음.
    this.physics.add.collider(this.player2.sprite, this.house2); //##$#$
    this.physics.add.collider(this.player1.sprite, this.house2);

  }
  update() {
    //플레이어 이동
    this.player1.moveManager(this.cursorKeys.up, this.cursorKeys.down, this.cursorKeys.left, this.cursorKeys.right);
    this.player2.moveManager(this.keyW, this.keyS, this.keyA, this.keyD);
    //Text Displays update
    this.player1InventoryDisplay.setText("" + this.player1.invItems.getLength() + '/' + this.player1.itemMax);
    this.player2InventoryDisplay.setText("" + this.player2.invItems.getLength() + '/' + this.player2.itemMax);
    this.player1InventoryDisplay.setPosition(this.player1.sprite.x + 20, this.player1.sprite.y);
    this.player2InventoryDisplay.setPosition(this.player2.sprite.x + 20, this.player2.sprite.y);
    this.house1Display.setText("" + this.house1Stock + '/' + gameSettings.maxStock);
    this.house2Display.setText("" + this.house2Stock + '/' + gameSettings.maxStock);
    //Player inventory movement
    this.player1.invManager();
    this.player2.invManager();
    //Item re-generation
    if (this.items.getLength() >= gameSettings.maxObjects + 5) {
      this.timedItemEvent.paused = true;
    } else {
      this.timedItemEvent.paused = false;
    }
    // victory determination
    if (this.house1Stock >= gameSettings.maxStock) {
      super.active = false;
      this.scene.start("endGame", {
        player: "player2"
      });
    } else if (this.house2Stock >= gameSettings.maxStock) {
      super.active = false;
      this.scene.start("endGame", {
        player: "player1"
      });
    }
    if (this.tornado.sprite.body.velocity.x >= 700 || this.tornado.sprite.body.velocity.y >= 700) {
      this.tornado.sprite.setTint(0xff2255);
    }

  }
  mySetRandomPosition(platform, item) {
    item.setRandomPosition(0, 0, game.config.width, game.config.height);
  }
  //아이템을 씬에 하나 추가하는 함수.
  plusItemInScene() {
    var item = this.physics.add.sprite(0, 0, "item_chamchi").setScale(0.6, 0.6);
    if (Math.random() > 0.5) {
      item.play("anim_chamchi");
    } else {
      item.play("anim_bread");
    }
    item.setRandomPosition(0, 0, game.config.width, game.config.height);
    item.setCollideWorldBounds(true);
    item.setDepth(1);
    this.items.add(item);
    /*var item = this.physics.add.sprite(32, 32, "item_pink");
    this.items.add(item);
    item.setRandomPosition(0, 0, game.config.width, game.config.height);
    if (Math.random() > 0.5) {
      item.play("anim_pink");
    } else {
      item.play("anim_green");
    }
    item.setCollideWorldBounds(true);*/
  }
  //플레이어 2가 플레이어 1의 집에 보석을 넣는 함수.
  storeToHouse1(player2Sprite, House1Sprite) {
    this.house1Stock = this.house1Stock + this.player2.invItems.getLength();
    this.player2.invItems.clear(false, true);
  }
  //플레이어 1이 플레이어 2의 집에 보석을 넣는 함수.
  storeToHouse2(player1Sprite, House2Sprite) {
    this.house2Stock = this.house2Stock + this.player1.invItems.getLength();
    this.player1.invItems.clear(false, true);
  }
}