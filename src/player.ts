export class Player {
    x = 0;
    y = 0;
    targetX = 0;
    targetY = 0;
    width: number;
    height: number;
    speed = 3;

    constructor(tileSize: number) {
        this.width = tileSize;
        this.height = tileSize;
    }
};