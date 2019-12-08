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
        this.add.image(config.width / 5, config.height / 2, this.Victory).setScale(2.5);
        this.startText = this.add.text(config.width * 2 / 5, config.height / 2,
            this.Victory + " Win!", {
                font: "50px Arial",
                fill: "yellow"
            });
        console.log(this);
    }

    create() {

    }
    update() {

    }


}