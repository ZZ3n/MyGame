class Player {
    
    constructor(scene,x,y,spriteName,name)
    {
     this.name = name; 
     this.invCount = 0;
     this.scene = scene;
     this.sprite = scene.physics.add.sprite(x, y, spriteName);
     this.sprite.setSize(38,50);
     this.sprite.setCollideWorldBounds(true);
    }

    plusInvItem(playerSprite,item) {
        this.invCount++;
        item.setPosition(playerSprite.x+100, playerSprite.y+100);
        item.setVelocity(0);
    }
    
    moveManager(up,down,left,right) {

        this.sprite.setVelocity(0);
    
        if (left.isDown) {
          this.sprite.setVelocityX(-gameSettings.playerSpeed);
          this.sprite.play(this.name + "_left_anim", true);
        }
        else if (right.isDown) {
          this.sprite.setVelocityX(gameSettings.playerSpeed);
          this.sprite.play(this.name + "_right_anim", true);
        }
    
        if (down.isDown) {
          this.sprite.setVelocityY(gameSettings.playerSpeed);
          this.sprite.play(this.name + "_down_anim", true);
        }
        else if (up.isDown) {
          this.sprite.setVelocityY(-gameSettings.playerSpeed);
          this.sprite.play(this.name + "_up_anim", true);
        }
    }
}