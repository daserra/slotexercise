import {ReelController} from "./ReelController";
import {brandsMap, destroyPixiObject, getRandomPositionFromArray} from "../Utils";
import {BrandController} from "./BrandController";
import {SymbolsPool} from "../SymbolsPool";
import {SlotView} from "../views/SlotView";
import {Container, IPointData} from "pixi.js";
import {VisualController} from "./VisualController";
import {ReelBrandIndexes} from "./CheatController";

export class SlotController implements VisualController {
    private _reels: ReelController[] = [];
    private readonly _view: SlotView;

    constructor(private _symbolsPool: SymbolsPool, slotContainer: Container, distanceBetweenReels: number) {
        this._view = new SlotView(distanceBetweenReels);
        slotContainer.addChild(this._view);
    }

    setupReels(numberOfReels: number, numberOfSymbols: number) {
        for (let reelIndex = 0; reelIndex < numberOfReels; reelIndex++) {
            this._reels[reelIndex] = new ReelController(reelIndex, new BrandController(brandsMap[reelIndex]), this._symbolsPool, numberOfSymbols);
            this._reels[reelIndex].updateSymbolsByBrandIndex(0);
            this._view.addReel(this._reels[reelIndex].view)
        }
    }

    changePosition(position: IPointData) {
        this._view.position.set(position.x, position.y);
    }

    destroy() {
        destroyPixiObject(this._view);
        this._reels = [];
    }

    updateReelsRandomly() {
        for (const reel of this._reels) {
            reel.cleanReel();
            reel.updateSymbolsByBrandIndex(getRandomPositionFromArray(reel.getActiveBrand()));
        }
    }

    updateReelsByIndexes(brandsIndexes: ReelBrandIndexes) {
        brandsIndexes.forEach(({reelIndex, brandIndex} ) => {
            this._reels[reelIndex].cleanReel();
            this._reels[reelIndex].updateSymbolsByBrandIndex(brandIndex);
        });
    }

    getReelsSymbols() {
        return this._reels.map((reel) => reel.view.symbols.map((symbol) => symbol.code))
    }
}