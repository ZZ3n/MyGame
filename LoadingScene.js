/** @type {import ("../typings/phaser")}*/

class Loading extends Phaser.Scene {
  constructor() {
    super({
      key: "bootGame",
      visible: true,
      active: true
    });
  }
  preload() {
    console.log("Loading Start");
    this.add.text(100, 100, 'Now Loading...', {
      fill: '#00ff00',
      fontSize: 50
    });
    
    this.load.image('TitleImg', 'assets/images/Title.png');
    this.load.image('ButtonImg', 'assets/images/StartButton.png');

    this.load.image("map1", "assets/images/map1/map1.png");
    this.load.image("map2", "assets/images/map2/map2.PNG");
    this.load.image("speedup", "assets/images/SpeedUp.png");

    this.load.image("waterblock1", "assets/images/map1/waterblock1.PNG");
    this.load.image("waterblock2", "assets/images/map1/waterblock2.PNG");
    this.load.image("waterblock3", "assets/images/map1/waterblock3.PNG");
    this.load.image("waterblock4", "assets/images/map1/waterblock4.PNG");
    this.load.image("map1block5", "assets/images/map1/map1block5.PNG");
    this.load.image("map1block6", "assets/images/map1/map1block6.PNG");
    this.load.image("map1block7", "assets/images/map1/map1block7.PNG");
    this.load.image("map1block8", "assets/images/map1/map1block8.PNG");
    this.load.image("map1block9", "assets/images/map1/map1block9.PNG");
    this.load.image("map1block10", "assets/images/map1/map1block10.PNG");

    this.load.image("map2block1_1", "assets/images/map2/map2_block1_1.PNG");
    this.load.image("map2block1", "assets/images/map2/map2_block1.PNG");
    this.load.image("map2block2_2", "assets/images/map2/map2_block2_2.PNG");
    this.load.image("map2block2", "assets/images/map2/map2_block2.PNG");
    this.load.image("map2block3_1", "assets/images/map2/map2_block3_1.PNG");
    this.load.image("map2block3_2", "assets/images/map2/map2_block3_2.PNG");
    this.load.image("map2block3_3", "assets/images/map2/map2_block3_3.PNG");
    this.load.image("map2block3_4", "assets/images/map2/map2_block3_4.PNG");
    this.load.image("map2block4", "assets/images/map2/map2_block4.PNG");
    this.load.image("map2block4_1", "assets/images/map2/map2_block4_1.PNG");
    this.load.image("map2block4_2", "assets/images/map2/map2_block4_2.PNG");
    this.load.image("map2block5", "assets/images/map2/map2_block5.PNG");
    this.load.image("map2block6", "assets/images/map2/map2_block6.PNG");
    this.load.image("map2block7", "assets/images/map2/map2_block7.PNG");
    this.load.image("map2block8", "assets/images/map2/map2_block8.PNG");
    this.load.image("map2block9", "assets/images/map2/map2_block9.PNG");
    this.load.image("map2block10", "assets/images/map2/map2_block10.PNG");

    this.load.image("house1", "assets/images/house1.png");
    this.load.image("house2", "assets/images/house2.png");
    this.load.image("bread", "assets/images/bread.png");

    this.load.spritesheet("player1", "assets/spritesheets/P1.png", {
      frameWidth: 64,
      frameHeight: 64
    }); // 모두 소문자임에 주의!

    this.load.spritesheet("tornado", "assets/spritesheets/tornado.png", {
      frameWidth: 48,
      frameHeight: 48
    }); // 모두 소문자임에 주의!

    this.load.spritesheet("player2", "assets/spritesheets/P2.png", {
      frameWidth: 64,
      frameHeight: 64
    }); // 모두 소문자임에 주의!
    /*
        this.load.spritesheet("item_pink", "assets/spritesheets/pink.png", {
          frameWidth: 32,
          frameHeight: 32
        });

        this.load.spritesheet("item_green", "assets/spritesheets/green.png", {
          frameWidth: 32,
          frameHeight: 32
        });
        */
    this.load.spritesheet("item_chamchi", "assets/spritesheets/ChamChi.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("item_bread", "assets/spritesheets/bread.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    this.anims.create({
      key: "p1_left_anim",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 4,
        end: 7
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p1_right_anim",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 8,
        end: 11
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p1_up_anim",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 12,
        end: 15
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p1_down_anim",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 0,
        end: 3
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p1_turn_anim",
      frames: [{
        key: "player1",
        frame: 0
      }],
      frameRate: 20
    });

    //#####################

    this.anims.create({
      key: "p2_left_anim",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 4,
        end: 7
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p2_right_anim",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 8,
        end: 11
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p2_up_anim",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 12,
        end: 15
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });

    this.anims.create({
      key: "p2_down_anim",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 0,
        end: 3
      }),
      frameRate: gameSettings.playerFramerate,
      repeat: 1
    });


    this.anims.create({
      key: "p2_turn_anim",
      frames: [{
        key: "player2",
        frame: 0
      }],
      frameRate: 20
    });

    //#########################

    /*this.anims.create({
      key: "anim_pink",
      frames: this.anims.generateFrameNumbers("item_pink"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "anim_green",
      frames: this.anims.generateFrameNumbers("item_green"),
      frameRate: 20,
      repeat: -1
    });*/
    this.anims.create({
      key: "anim_chamchi",
      frames: this.anims.generateFrameNumbers("item_chamchi", {
        start: 0,
        end: 13
      }),
      frameRate: 10,
      repeat: -1,
      repeatDelay: 1000
    });

    this.anims.create({
      key: "anim_bread",
      frames: this.anims.generateFrameNumbers("item_bread", {
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1,
      repeatDelay: 1000
    });

    //##########################
    this.anims.create({
      key: "anim_tornado",
      frames: this.anims.generateFrameNumbers("tornado"),
      frameRate: gameSettings.playerFramerate,
      repeat: -1
    });
    console.log("Loading Complete!");
    this.scene.start("startGame");
  }


}