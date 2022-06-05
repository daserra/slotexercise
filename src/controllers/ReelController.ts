import {BrandController} from "./BrandController";
import {ReelView} from "../views/ReelView";
import {SymbolsPool} from "../SymbolsPool";
import {VisualController} from "./VisualController";
import {destroyPixiObject} from "../Utils";

export class ReelController implements VisualController {

    private _view: ReelView;

    constructor(
        private readonly _id: number,
        private readonly _brandController: BrandController,
        private readonly _symbolsPool: SymbolsPool,
        private readonly _supportedSymbolsCount: number) {
        this._view = new ReelView();
    }

    get view() {
        return this._view;
    }

    updateSymbolsByBrandIndex(index: number) {
        const symbolsCode: string[] = []
        if (this.canResolveAllBrandPositionsByIndex(index)) { //Is the current brand index + supportedSymbols smaller than brand size
            symbolsCode.push(...this._brandController.getBrand().slice(index, index + this._supportedSymbolsCount))
        } else {
            symbolsCode.push(...this._brandController.getBrand().slice(index, this._brandController.getBrand().length - index));
            symbolsCode.push(...this._brandController.getBrand().slice(0, this._supportedSymbolsCount - symbolsCode.length))
        }
        symbolsCode.forEach(this.addSymbol.bind(this));
        this._view.updateIndexHeader(index);
    }

    cleanReel() {
        const symbolsToRemove = this._view.symbols;
        this._view.removeAllSymbols();
        symbolsToRemove.forEach((symbol) => this._symbolsPool.returnSymbol(symbol))
    }

    getActiveBrand() {
        return this._brandController.getBrand();
    }

    destroy() {
        destroyPixiObject(this._view);
    }

    private canResolveAllBrandPositionsByIndex(index: number) {
        return index + this._supportedSymbolsCount <= this._brandController.getBrand().length
    }

    private addSymbol(symbolCode: string) {
        this._view.addSymbol(this._symbolsPool.getSymbol(symbolCode))
    }
}
