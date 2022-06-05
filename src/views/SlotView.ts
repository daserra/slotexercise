import {Container, DisplayObject, Sprite} from "pixi.js";

export class SlotView extends Container {
    private _reelsContainer: Container;

    constructor(private readonly _distanceBetweenReels: number) {
        super();
        this._reelsContainer = new Container();
        this.addChild(this._reelsContainer);
    }

    addReel(reel: DisplayObject) {
        reel.x = this.resolveReelPosition();
        this._reelsContainer.addChild(reel);
    }

    private resolveReelPosition() {
        if (this._reelsContainer.children.length > 0) {
            const lastChild = this._reelsContainer.getChildAt(this._reelsContainer.children.length - 1) as Container;
            return lastChild.x + this._distanceBetweenReels;
        }
        return 0;

    }
}