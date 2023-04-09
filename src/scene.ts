import { Camera } from "./camera";
import { Player } from "./player";

export class Scene {
    lastTime = 0;
    canvas;
    ctx;

    tileSize: number;
    visibleTiles = 10;
    matrixSize: number;
    mapSize: number;
    viewSize: number;
    player;
    camera;
    matrix;

    constructor(matrixSize: number, matrix: any, tileSize: number, mapSize: number, player: Player) {
        this.tileSize = tileSize;
        this.matrixSize = matrixSize;
        this.matrix = matrix;
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.player = player;

        this.mapSize = mapSize;
        this.viewSize = this.tileSize * this.visibleTiles;

        this.camera = new Camera(this.viewSize);
    
        this.canvas.width = this.viewSize;
        this.canvas.height = this.viewSize;
    }

    drawVisibleTiles(x: number, y: number) {
        const startX = Math.floor(x / this.tileSize) - Math.floor(this.visibleTiles / 2) - 1;
        const startY = Math.floor(y / this.tileSize) - Math.floor(this.visibleTiles / 2) - 1;
        const endX = startX + this.visibleTiles + 2;
        const endY = startY + this.visibleTiles + 2;
    
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (i >= 0 && i < this.matrixSize && j >= 0 && j < this.matrixSize) {
                    this.ctx.save();
                    this.ctx.translate(-this.camera.centerX, -this.camera.centerY);
                    this.drawTile(i, j, this.matrix[i][j]);
                    this.ctx.restore();
                }
            }
        }
    }
    
    drawTile(x: number, y: number, tile: any) {
        this.ctx.fillStyle = tile.type === 'grass' ? 'green' : 'gray';
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    }

    setPlayerTarget(dx: any, dy: any) {
        const newX = this.player.targetX + dx * this.tileSize;
        const newY = this.player.targetY + dy * this.tileSize;
    
        if (newX >= 0 && newX < this.mapSize && newY >= 0 && newY < this.mapSize) {
            this.player.targetX = newX;
            this.player.targetY = newY;
        }
    }

    draw(timestamp: any) {
        const delta = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.updatePlayerPosition(delta);
        this.camera.follow(this.player);
        this.drawVisibleTiles(this.camera.x, this.camera.y);
        this.drawPlayer();
    
        requestAnimationFrame(this.draw.bind(this));
    }

    play() {
        requestAnimationFrame(this.draw.bind(this));
    }

    updatePlayerPosition(delta: any) {
        const t = this.player.speed * delta;
        this.player.x = this.lerp(this.player.x, this.player.targetX, t);
        this.player.y = this.lerp(this.player.y, this.player.targetY, t);
    }

    lerp(start: any, end: any, t: any) {
        return start * (1 - t) + end * t;
    }
    
    drawPlayer() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(
            this.player.x - this.camera.centerX,
            this.player.y - this.camera.centerY,
            this.player.width,
            this.player.height
        );
    }
}