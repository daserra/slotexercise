import {Loader, Resource, Texture} from "pixi.js";

export interface GameLoader {
    queueAssetForLoading(assetKey: string, assetPath: string): void;

    loadAssets(onProgress: (progress: number) => void): Promise<void>

    getTextureByAssetKey(assetKey: string): Texture;
}

export class GameLoaderImp implements GameLoader {

    private _pixiLoader: Loader;

    constructor() {
        this._pixiLoader = new Loader();
    }

    loadAssets(onProgress: (progress: number) => void): Promise<void> {
        this._pixiLoader.onProgress.add((loader) => onProgress(Math.round(loader.progress)));
        return new Promise((resolve) => {
            this._pixiLoader.load(() => resolve());
        })

    }

    queueAssetForLoading(assetKey: string, assetPath: string): void {
        this._pixiLoader.add(assetKey, assetPath);
    }

    getTextureByAssetKey(assetKey: string) {
        const texture = this._pixiLoader.resources[assetKey].texture;
        if (!texture) {
            throw new Error(`The texture with id ${assetKey} does not exist.`);
        }
        return texture;
    }

}