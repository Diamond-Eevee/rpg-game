import { IMapObject } from "../engine/map-object-model";

export class Camera {
    x = 0;
    y = 0;
    centerX = 0;
    centerY = 0;
    width: number;
    height: number;

    constructor(viewSize: number) {
        this.width = viewSize;
        this.height = viewSize;
    }

    public follow(object: IMapObject): void {
        this.x = object.x;
        this.y = object.y;
        this.centerX = object.x - (this.width - object.width) / 2;
        this.centerY = object.y - (this.height - object.height) / 2;
    }
};
