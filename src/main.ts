import { GameEngine } from "./engine/game-engine";

const matrixSize = 50;

const matrix = new Array(matrixSize).fill(null).map(() =>
    new Array(matrixSize).fill({ type: 'grass' })
);

const game = new GameEngine(matrixSize, matrix)
game.initController();
game.play();
