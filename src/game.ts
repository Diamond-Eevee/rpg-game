import { Scene } from "./scene";
import { Player } from "./player";

export class Game {
    matrixSize;
    mapSize;
    matrix;
    tileSize = 25;
    scene: Scene;
    player: Player;

    constructor(matrixSize: number, matrix: any) {
        this.matrix = matrix;
        this.matrixSize = matrixSize;
        this.mapSize = this.tileSize * this.matrixSize;

        this.player = new Player(this.tileSize);
        this.scene = new Scene(matrixSize, matrix, this.tileSize, this.mapSize, this.player);
    }

    initController() {
        document.addEventListener('keydown', (e) => {
            switch (e.key.toLowerCase()) {
                case 'w':
                    this.scene.setPlayerTarget(0, -1);
                    break;
                case 's':
                    this.scene.setPlayerTarget(0, 1);
                    break;
                case 'a':
                    this.scene.setPlayerTarget(-1, 0);
                    break;
                case 'd':
                    this.scene.setPlayerTarget(1, 0);
                    break;
            }
        });
    }

    play() {
        this.scene.play();
    }
}