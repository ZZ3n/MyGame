/** @type {import ("../typings/phaser")}*/

var config = {
  width: 1280,
  height: 960,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2], // 씬 이름 배열로 저장하는거. 중요!
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

var gameSettings = {
  blockSize : 32,
  playerSpeed: 200,
  playerFramerate : 10
};

var game = new Phaser.Game(config);
