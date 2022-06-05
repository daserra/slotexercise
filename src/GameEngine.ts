import {GameRenderer} from "./GameRenderer";
import {GameLoader} from "./GameLoader";


export class GameEngine {

    constructor(private readonly _loader: GameLoader, private readonly _renderer: GameRenderer) {
        this.injectRendererIntoDocument()
    }

    get loader(): GameLoader {
        return this._loader;
    }

    get renderer(): GameRenderer {
        return this._renderer;
    }

    private injectRendererIntoDocument() {
        const div = document.getElementById("gameContainer");
        if (!div) {
            throw new Error(`gameContainer div not found.`);
        }
        this._renderer.injectRenderer(div);
    }
}