/** @type {import ("../typings/phaser")}*/

class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: "startGame",
            visible: true,
            active: true
        }); // 씬 이름 저장하는거.
    }
    preload() {
        this.startText = this.add.text(config.width/2, config.height/2, "Start", {
            font: "30px Arial",
            fill: "yellow"
        });
        console.log(this);
    }

    create() {

        this.startText.setInteractive();
        this.input.on('gameobjectup', this.startGame, this);
    }
    update() {

    }
    startGame() {
        this.scene.start("playGame");
    }


}