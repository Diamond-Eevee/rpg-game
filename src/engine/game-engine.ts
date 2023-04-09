import { SceneRenderer } from "../view/scene-renderer";
import { Character } from "./character";
import { CharacterController } from "./character-controller";
import { UserController } from "./user-controller";

export class GameEngine {
    matrixSize;
    mapSize;
    matrix;
    tileSize = 25;
    sceneRenderer: SceneRenderer;
    characterController: CharacterController;
    userController: UserController;
    lastTime = 0;

    constructor(matrixSize: number, matrix: any) {
        this.matrix = matrix;
        this.matrixSize = matrixSize;
        this.mapSize = this.tileSize * this.matrixSize;

        const character = new Character(this.tileSize);        
        this.characterController = new CharacterController(character, this.tileSize, this.mapSize);
        this.sceneRenderer = new SceneRenderer(matrixSize, this.tileSize, this.mapSize);
        
        this.userController = new UserController(this.characterController);
        this.userController.initController();
    }

    gameLoop(timestamp: any) {
        const delta = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.characterController.updatePosition(delta);

        this.sceneRenderer.camera.follow(this.characterController.character);
        this.sceneRenderer.draw(this.matrix);
        this.sceneRenderer.drawPlayer(this.characterController.character);

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    play() {
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}