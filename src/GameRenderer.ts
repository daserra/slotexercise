import {Application, Container} from "pixi.js";

export interface GameRenderer {
    rootContainer: Container,

    injectRenderer(element: HTMLElement): void;
}

export const CANVAS_SETTINGS = {size: {width: 1280, height: 720}, coordinates: {center: {x: (1280) / 2, y: 720 / 2}}}

export class GameRendererImp implements GameRenderer {

    private readonly _application: Application;

    constructor() {
        this._application = new Application(Object.assign({
            backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        }, CANVAS_SETTINGS.size));
    }

    get rootContainer() {
        return this._application.stage
    }

    injectRenderer(element: HTMLElement) {
        element.appendChild(this._application.view)
    }
}