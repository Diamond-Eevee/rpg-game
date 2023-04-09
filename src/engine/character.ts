export class Character {
    x = 0;
    y = 0;
    targetX = 0;
    targetY = 0;
    width: number;
    height: number;
    tileSize: number;
    speed = 3;

    constructor(tileSize: number) {
        this.tileSize = tileSize;
        this.width = tileSize;
        this.height = tileSize;
    }
};