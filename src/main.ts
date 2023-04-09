import { Game } from "./game";

const matrixSize = 50;

const matrix = new Array(matrixSize).fill(null).map(() =>
    new Array(matrixSize).fill({ type: 'grass' })
);

const game = new Game(matrixSize, matrix)
game.initController();
game.play();
