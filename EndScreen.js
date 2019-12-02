/** @type {import ("../typings/phaser")}*/

class EndScreen extends Phaser.Scene {
    constructor() {
        super({
            key: "endGame",
            visible: false,
            active: false
        }); // 씬 이름 저장하는거.
    }
    preload() {
        this.startText = this.add.text(config.width/2, config.height/2, "The EnD", {
            font: "30px Arial",
            fill: "red"
        });
        console.log(this);
    }

    create() {
        
    }
    update() {

    }
    

}