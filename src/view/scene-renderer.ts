import { Camera } from "./camera";

export class SceneRenderer {
    canvas;
    ctx;

    tileSize: number;
    visibleTiles = 10;
    matrixSize: number;
    mapSize: number;
    viewSize: number;
    camera;

    constructor(matrixSize: number, tileSize: number, mapSize: number) {
        this.tileSize = tileSize;
        this.matrixSize = matrixSize;
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.mapSize = mapSize;
        this.viewSize = this.tileSize * this.visibleTiles;

        this.camera = new Camera(this.viewSize);
    
        this.canvas.width = this.viewSize;
        this.canvas.height = this.viewSize;
    }

    private drawVisibleTiles(x: number, y: number, tilesMatrix: any): void {
        const startX = Math.floor(x / this.tileSize) - Math.floor(this.visibleTiles / 2) - 1;
        const startY = Math.floor(y / this.tileSize) - Math.floor(this.visibleTiles / 2) - 1;
        const endX = startX + this.visibleTiles + 2;
        const endY = startY + this.visibleTiles + 2;
    
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (i >= 0 && i < this.matrixSize && j >= 0 && j < this.matrixSize) {
                    this.ctx.save();
                    this.ctx.translate(-this.camera.centerX, -this.camera.centerY);
                    this.drawTile(i, j, tilesMatrix[i][j]);
                    this.ctx.restore();
                }
            }
        }
    }
    
    private drawTile(x: number, y: number, tile: any): void {
        this.ctx.fillStyle = tile.type === 'grass' ? 'green' : 'gray';
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    }

    public draw(tilesMatrix: any): void {    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);            
        this.drawVisibleTiles(this.camera.x, this.camera.y, tilesMatrix);        
    }
    
    public drawPlayer(player: any): void {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(
            player.x - this.camera.centerX,
            player.y - this.camera.centerY,
            player.width,
            player.height
        );
    }
}