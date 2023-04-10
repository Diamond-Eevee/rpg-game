import { Character } from "./character";

export class CharacterController {
    constructor(public character: Character, private tileSize: number, private mapSize: number) {

    }
    
    public setPlayerTarget(dx: number, dy: number): void {
        const newX = this.character.targetX + dx * this.tileSize;
        const newY = this.character.targetY + dy * this.tileSize;
    
        if (newX >= 0 && newX < this.mapSize && newY >= 0 && newY < this.mapSize) {
            this.character.targetX = newX;
            this.character.targetY = newY;
        }
    }

    private lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t;
    }

    public updatePosition(delta: number): void {
        const t = this.character.speed * delta;
        this.character.x = this.lerp(this.character.x, this.character.targetX, t);
        this.character.y = this.lerp(this.character.y, this.character.targetY, t);
    }
}
