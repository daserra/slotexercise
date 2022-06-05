import {Container, Sprite, Texture} from "pixi.js";

export class SpinButtonView extends Container {

    private _buttonSprite: Sprite;

    constructor(buttonTexture: Texture) {
        super();
        this._buttonSprite = new Sprite(buttonTexture);
        this._buttonSprite.anchor.set(0.5);
        this._buttonSprite.scale.set(0.5);
        this._buttonSprite.buttonMode = true;
        this._buttonSprite.on("pointerdown", () => this.emit("spinClick"));
        this.addChild(this._buttonSprite);
    }

    activate() {
        this._buttonSprite.interactive = true;
    }

}