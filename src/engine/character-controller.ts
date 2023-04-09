import { Character } from "./character";

export class CharacterController {
    constructor(public character: Character, private tileSize: number, private mapSize: number) {

    }
    
    setPlayerTarget(dx: any, dy: any) {
        const newX = this.character.targetX + dx * this.tileSize;
        const newY = this.character.targetY + dy * this.tileSize;
    
        if (newX >= 0 && newX < this.mapSize && newY >= 0 && newY < this.mapSize) {
            this.character.targetX = newX;
            this.character.targetY = newY;
        }
    }

    private lerp(start: any, end: any, t: any) {
        return start * (1 - t) + end * t;
    }

    updatePosition(delta: any) {
        const t = this.character.speed * delta;
        this.character.x = this.lerp(this.character.x, this.character.targetX, t);
        this.character.y = this.lerp(this.character.y, this.character.targetY, t);
    }
}