import { SceneRenderer } from "../view/scene-renderer";
import { Player } from "../player";

export class GameEngine {
    matrixSize;
    mapSize;
    matrix;
    tileSize = 25;
    sceneRenderer: SceneRenderer;
    player: Player;
    lastTime = 0;

    constructor(matrixSize: number, matrix: any) {
        this.matrix = matrix;
        this.matrixSize = matrixSize;
        this.mapSize = this.tileSize * this.matrixSize;

        this.player = new Player(this.tileSize);
        this.sceneRenderer = new SceneRenderer(matrixSize, this.tileSize, this.mapSize);
    }

    initController() {
        document.addEventListener('keydown', (e) => {
            switch (e.key.toLowerCase()) {
                case 'w':
                    this.setPlayerTarget(0, -1);
                    break;
                case 's':
                    this.setPlayerTarget(0, 1);
                    break;
                case 'a':
                    this.setPlayerTarget(-1, 0);
                    break;
                case 'd':
                    this.setPlayerTarget(1, 0);
                    break;
            }
        });
    }

    gameLoop(timestamp: any) {
        const delta = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.updatePlayerPosition(delta);
        requestAnimationFrame(this.gameLoop.bind(this));

        this.sceneRenderer.camera.follow(this.player);
        this.sceneRenderer.draw(this.matrix);
        this.sceneRenderer.drawPlayer(this.player);
    }

    setPlayerTarget(dx: any, dy: any) {
        const newX = this.player.targetX + dx * this.tileSize;
        const newY = this.player.targetY + dy * this.tileSize;
    
        if (newX >= 0 && newX < this.mapSize && newY >= 0 && newY < this.mapSize) {
            this.player.targetX = newX;
            this.player.targetY = newY;
        }
    }

    updatePlayerPosition(delta: any) {
        const t = this.player.speed * delta;
        this.player.x = this.lerp(this.player.x, this.player.targetX, t);
        this.player.y = this.lerp(this.player.y, this.player.targetY, t);
    }

    lerp(start: any, end: any, t: any) {
        return start * (1 - t) + end * t;
    }

    play() {
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}