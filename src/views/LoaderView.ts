import {Container, Text} from "pixi.js";
import {CANVAS_SETTINGS} from "../GameRenderer";

export class LoaderView extends Container {
    private _loadingLabel: Text;

    constructor() {
        super();
        this._loadingLabel = new Text("");
        const {x, y} = CANVAS_SETTINGS.coordinates.center;
        this._loadingLabel.anchor.set(0.5);
        this._loadingLabel.position.set(x, y);
        this.addChild(this._loadingLabel);
    }

    updateProgress(progress: number) {
        this._loadingLabel.text = `LOADING ${progress}%`;
    }

    finishLoading() {
        this._loadingLabel.text = `LOADING COMPLETED`;
    }
}