import {SpinButtonView} from "../views/SpinButtonView";
import {Container, IPointData, Texture} from "pixi.js";
import {destroyPixiObject} from "../Utils";
import {VisualController} from "./VisualController";

export class SpinButtonController implements VisualController {

    private readonly _view: SpinButtonView;
    private _clickResolver: Function | undefined;

    constructor(buttonContainer: Container, buttonTexture: Texture) {
        this._view = new SpinButtonView(buttonTexture);
        buttonContainer.addChild(this._view);
        this._view.on("spinClick", this.onClick.bind(this));
    }

    activate() {
        this._view.activate();
    }

    destroy() {
        destroyPixiObject(this._view);
    }

    changePosition(position: IPointData) {
        this._view.position.set(position.x, position.y);
    }

    async waitForClick() {
        return new Promise((resolve) => {
            this._clickResolver = resolve;
        });
    }

    onClick() {
        this._clickResolver?.();
    }


}