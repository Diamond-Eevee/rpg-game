import { GameEngine } from "./engine/game-engine";
import { Tile, TileTypes } from "./engine/tile";

const matrixSize = 50;

const matrix = new Array(matrixSize).fill(null).map(() =>
    new Array(matrixSize).fill(new Tile(TileTypes.GRASS))
);

const game = new GameEngine(matrixSize, matrix)
game.play();
