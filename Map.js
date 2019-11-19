class Map {
    constructor(scene,mapName) {
        // 스프라이트 만들기.
        // 씬에 맵 배경 넣기
        this.makeWall();
       // this.makeQuest(x,y);
    }
    
    makeWall() { // 이름따라 장애물 추가하기.
        if (this.mapName == 'A') {
            //xA1,yA1 에 장애물 추가...
            //xA2,yA2 에 장애물 추가...
            // etc..
            // 장애물 그룹으로 묶기.
        }
        else if (this.mapName == 'B') {
            //xB1,yB1 에 장애물 추가...
            //xB2,yB2 에 장애물 추가...
            // etc..
            // 장애물 그룹으로 묶기.
        }
        //else if ...

        //장애물 그룹과 scene의 플레이어, 아이템 충돌 설정하기.
    }

    makeQuest(x,y) { // x,y에 퀘스트 생성하기.
        //미정.
    }

    makeItem() { // 랜덤포지션에 랜덤아이템 생성하기.
        //미정.
    }

}