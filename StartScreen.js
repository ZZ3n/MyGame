/** @type {import ("../typings/phaser")}*/

class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: "startGame",
            visible: true,
            active: false
        });
    }
    preload() {
        //?백그라운드 색깔 설정.
        //?로고 만들어야함.
        this.mapName = "map1";
        console.log("Button Up!");
        this.button = this.add.image(config.width/2,config.height*2/3,'ButtonImg');
        this.map1 = this.add.image(config.width/5,config.height*4/5,"map1");
        this.map2 = this.add.image(config.width*4/5,config.height*4/5,"map2");
        this.map1.setScale(0.3,0.3);
        this.map2.setScale(0.3,0.3);
    }

    create() { // key: "bootGame",
        this.button.setInteractive();
        this.map1.setInteractive().setTint(0xff4444);
        this.map2.setInteractive();
        this.button.on('pointerup', this.startGame, this);
        this.map1.on('pointerup', function () {
            if (this.scene.mapName == "map2") {
                this.scene.map2.clearTint();
            }
            this.scene.mapName = "map1";
           this.setTint(0xff4444);
        });
        this.map2.on('pointerup', function () {
            if (this.scene.mapName == "map1") {
                this.scene.map1.clearTint();
            }
            this.scene.mapName = "map2";
            this.setTint(0xff4444);
        });
    }
    update() {
        
    }
    startGame() {
        this.scene.start("playGame",{map : this.mapName});
    }


}