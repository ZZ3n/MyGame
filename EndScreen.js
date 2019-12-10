/** @type {import ("../typings/phaser")}*/

class EndScreen extends Phaser.Scene {
    constructor() {
        super({
            key: "endGame",
            visible: false,
            active: false
        }); // 씬 이름 저장하는거.


    }
    init(data) {
        this.Victory = data.player;
    }
    preload() {
        if (this.Victory == "player1") {
            this.add.image(config.width / 2, config.height / 2, "P1_win_grass");
        }
        else {
            this.add.image(config.width / 2, config.height / 2, "P2_win_grass");
        }
        
        console.log(this);
    }

    create() {

    }
    update() {

    }


}