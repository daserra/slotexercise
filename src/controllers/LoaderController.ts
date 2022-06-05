import {GameEngine} from "../GameEngine";
import {LoaderView} from "../views/LoaderView";
import {destroyPixiObject, sleepForMs} from "../Utils";
import {VisualController} from "./VisualController";

export class LoaderController implements VisualController {

    private readonly _view: LoaderView;

    constructor(private readonly _gameEngine: GameEngine) {
        this._view = new LoaderView();
        this._gameEngine.renderer.rootContainer.addChild(this._view);
    }

    async loadAssets() {
        this._gameEngine.loader.queueAssetForLoading("hv1", "./assets/hv1_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("hv2", "./assets/hv2_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("hv3", "./assets/hv3_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("hv4", "./assets/hv4_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("lv1", "./assets/lv1_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("lv2", "./assets/lv2_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("lv3", "./assets/lv3_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("lv4", "./assets/lv4_symbol.png");
        this._gameEngine.loader.queueAssetForLoading("spin_button", "./assets/spin_button.png");
        await this._gameEngine.loader.loadAssets(this.onLoadingProgress.bind(this))
        this._view.finishLoading();
        await sleepForMs(1000);
    }

    private onLoadingProgress(progress: number) {
        this._view.updateProgress(progress)
    }

    destroy() {
        destroyPixiObject(this._view);
    }
}