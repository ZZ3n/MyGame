class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("grass", "assets/images/grass.png") // 80 x 40
    this.load.spritesheet("player1", "assets/spritesheets/P1.png", {
      frameWidth: 64,
      frameHeight: 64
    }); // 모두 소문자임에 주의!

    this.load.spritesheet("player2", "assets/spritesheets/P2.png", {
      frameWidth: 64,
      frameHeight: 64
    }); // 모두 소문자임에 주의!
    this.load.spritesheet("item_pink", "assets/spritesheets/pink.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("item_green", "assets/spritesheets/green.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.add.text(20, 20, "Loading game..."); // 텍스트를 화면에 띄움.
    this.scene.start("playGame");

   
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
        start:12,
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
      frames: [{ key: "player1", frame: 0 }],
      frameRate: 20
    })

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
        start:12,
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
      frames: [{ key: "player2", frame: 0 }],
      frameRate: 20
    })
    
    //#########################

  

    

    this.anims.create({
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
    });
  }


}
