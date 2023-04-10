import { Tile } from "../engine/tile";

export class TileRenderer {
    constructor(
        public tileSize: number        
    ) { }

    public draw(x: number, y: number, tile: Tile, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = tile.type === 'grass' ? 'green' : 'gray';
        ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    }
}
