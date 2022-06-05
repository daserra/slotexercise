import {Sprite, Texture} from "pixi.js";

export class SymbolView extends Sprite {
    constructor(private _code: string, texture: Texture) {
        super(texture);
    }

    get code() {
        return this._code;
    }
}