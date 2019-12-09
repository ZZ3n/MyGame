/** @type {import ("../typings/phaser")}*/

class GameMap {
    constructor(scene, mapName) {
        // 스프라이트 만들기.
        // 씬에 맵 배경 넣기
        console.log(mapName + " Create started");
        this.scene = scene;
        this.mapName = mapName;
        this.makeWall();
        // this.makeQuest(x,y);
        console.log(mapName + " Create End");
    }

    makeWall() { // 이름따라 장애물 추가하기.

        if (this.mapName == "map1") {

            this.scene.background = this.scene.add.tileSprite(0, 0, config.width, config.height, "map1");
            this.scene.background.setOrigin(0, 0);

            this.scene.platforms.create(gameSettings.blockSize * 10.9844, gameSettings.blockSize * 1.8, 'waterblock1');
            this.scene.platforms.create(gameSettings.blockSize * 10.986, gameSettings.blockSize * 9.55, 'waterblock2');
            this.scene.platforms.create(gameSettings.blockSize * 10.986, gameSettings.blockSize * 19.6, 'waterblock3');
            this.scene.platforms.create(gameSettings.blockSize * 10.986, gameSettings.blockSize * 27.5, 'waterblock4');
            this.scene.platforms.create(gameSettings.blockSize * 28.9844, gameSettings.blockSize * 1.8, 'waterblock1');
            this.scene.platforms.create(gameSettings.blockSize * 28.9844, gameSettings.blockSize * 9.55, 'waterblock2');
            this.scene.platforms.create(gameSettings.blockSize * 28.9844, gameSettings.blockSize * 19.6, 'waterblock3');
            this.scene.platforms.create(gameSettings.blockSize * 28.9844, gameSettings.blockSize * 27.5, 'waterblock4');


            this.scene.platforms.create(gameSettings.blockSize * 8.5, gameSettings.blockSize * 0.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 7.5, gameSettings.blockSize * 1.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 6.5, gameSettings.blockSize * 2.5, 'map1block8');

            this.scene.platforms.create(gameSettings.blockSize * 3.03, gameSettings.blockSize * 10.45, 'map1block5');
            this.scene.platforms.create(gameSettings.blockSize * 7.5, gameSettings.blockSize * 9, 'map1block7');

            this.scene.platforms.create(gameSettings.blockSize * 3.03, gameSettings.blockSize * 18.45, 'map1block5');
            this.scene.platforms.create(gameSettings.blockSize * 7.5, gameSettings.blockSize * 20, 'map1block7');

            this.scene.platforms.create(gameSettings.blockSize * 8.5, gameSettings.blockSize * 29.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 7.5, gameSettings.blockSize * 28.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 6.5, gameSettings.blockSize * 27.5, 'map1block8');

            this.scene.platforms.create(gameSettings.blockSize * 15.5, gameSettings.blockSize * 1.1, 'map1block7');
            this.scene.platforms.create(gameSettings.blockSize * 24.5, gameSettings.blockSize * 1.1, 'map1block7');

            this.scene.platforms.create(gameSettings.blockSize * 16.5, gameSettings.blockSize * 10, 'map1block10');
            this.scene.platforms.create(gameSettings.blockSize * 23.5, gameSettings.blockSize * 10, 'map1block10');

            this.scene.platforms.create(gameSettings.blockSize * 20, gameSettings.blockSize * 17.5, 'map1block5');
            this.scene.platforms.create(gameSettings.blockSize * 20, gameSettings.blockSize * 21.5, 'map1block5');

            this.scene.platforms.create(gameSettings.blockSize * 20, gameSettings.blockSize * 26.5, 'map1block6');

            this.scene.platforms.create(gameSettings.blockSize * 31.5, gameSettings.blockSize * 0.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 32.5, gameSettings.blockSize * 1.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 33.5, gameSettings.blockSize * 2.5, 'map1block8');

            this.scene.platforms.create(gameSettings.blockSize * 36.97, gameSettings.blockSize * 10.45, 'map1block5');
            this.scene.platforms.create(gameSettings.blockSize * 32.5, gameSettings.blockSize * 9, 'map1block7');

            this.scene.platforms.create(gameSettings.blockSize * 36.97, gameSettings.blockSize * 18.45, 'map1block5');
            this.scene.platforms.create(gameSettings.blockSize * 32.5, gameSettings.blockSize * 20, 'map1block7');

            this.scene.platforms.create(gameSettings.blockSize * 31.5, gameSettings.blockSize * 29.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 32.5, gameSettings.blockSize * 28.5, 'map1block8');
            this.scene.platforms.create(gameSettings.blockSize * 33.5, gameSettings.blockSize * 27.5, 'map1block8');

            //xA1,yA1 에 장애물 추가...
            //xA2,yA2 에 장애물 추가...
            // etc..
            // 장애물 그룹으로 묶기.

        } else if (this.mapName == 'map2') {

            this.scene.background = this.scene.add.tileSprite(0, 0, config.width, config.height, "map2");
            this.scene.background.setOrigin(0, 0);

            this.scene.platforms.create(gameSettings.blockSize * 20.5, gameSettings.blockSize * 5, 'map2block1_1');
            this.scene.platforms.create(gameSettings.blockSize * 20.5, gameSettings.blockSize * 1.5, 'map2block1');

            this.scene.platforms.create(gameSettings.blockSize * 19.5, gameSettings.blockSize * 28.5, 'map2block2');
            this.scene.platforms.create(gameSettings.blockSize * 19.5, gameSettings.blockSize * 25, 'map2block2_2');

            this.scene.platforms.create(gameSettings.blockSize * 20.5, gameSettings.blockSize * 12.9, 'map2block3_1');
            this.scene.platforms.create(gameSettings.blockSize * 16.4, gameSettings.blockSize * 14.5, 'map2block3_2');
            this.scene.platforms.create(gameSettings.blockSize * 19.47, gameSettings.blockSize * 17.12, 'map2block3_3');
            this.scene.platforms.create(gameSettings.blockSize * 23.65, gameSettings.blockSize * 15.5, 'map2block3_4');

            this.scene.platforms.create(gameSettings.blockSize * 3.5, gameSettings.blockSize * 14.5, 'map2block4_1');
            this.scene.platforms.create(gameSettings.blockSize * 7.5, gameSettings.blockSize * 14.5, 'map2block4');

            this.scene.platforms.create(gameSettings.blockSize * 37.5, gameSettings.blockSize * 15.5, 'map2block4_1');
            this.scene.platforms.create(gameSettings.blockSize * 33, gameSettings.blockSize * 15.5, 'map2block4_2');

            this.scene.platforms.create(gameSettings.blockSize * 12, gameSettings.blockSize * 20.5, 'map2block5');
            this.scene.platforms.create(gameSettings.blockSize * 14.5, gameSettings.blockSize * 22.5, 'map2block4_1');

            this.scene.platforms.create(gameSettings.blockSize * 12, gameSettings.blockSize * 9.5, 'map2block5');
            this.scene.platforms.create(gameSettings.blockSize * 14.5, gameSettings.blockSize * 7.5, 'map2block4_1');

            this.scene.platforms.create(gameSettings.blockSize * 28, gameSettings.blockSize * 9.5, 'map2block5');
            this.scene.platforms.create(gameSettings.blockSize * 25.5, gameSettings.blockSize * 7.5, 'map2block4_1');

            this.scene.platforms.create(gameSettings.blockSize * 28, gameSettings.blockSize * 20.5, 'map2block5');
            this.scene.platforms.create(gameSettings.blockSize * 25.5, gameSettings.blockSize * 22.5, 'map2block4_1');
            
            //##
            this.scene.platforms.create(gameSettings.blockSize*5.5, gameSettings.blockSize*26.5, 'map2block6');
            this.scene.platforms.create(gameSettings.blockSize*34.5, gameSettings.blockSize*3.5, 'map2block6');
            //##
            //this.scene.platforms.create(gameSettings.blockSize*33, gameSettings.blockSize*15., 'map2block4_2');
            //xB1,yB1 에 장애물 추가...
            //xB2,yB2 에 장애물 추가...
            // etc..
            // 장애물 그룹으로 묶기.

        }

        //else if ...

        //장애물 그룹과 scene의 플레이어, 아이템 충돌 설정하기.
    }

    makeQuest(x, y) { // x,y에 퀘스트 생성하기.
        //미정.
    }

    makeItem() { // 랜덤포지션에 랜덤아이템 생성하기.
        //미정.
    }

}