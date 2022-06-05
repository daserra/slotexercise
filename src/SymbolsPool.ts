import {GameLoader} from "./GameLoader";
import {SymbolView} from "./views/SymbolView";

export class SymbolsPool {
    private _symbols: Record<string, SymbolView[]> = {}

    constructor(private readonly _loader: GameLoader) {
    }

    getSymbol(symbolCode: string) {
        if (!this._symbols[symbolCode] || this._symbols[symbolCode].length === 0) {
            const symbol = new SymbolView(symbolCode, this._loader.getTextureByAssetKey(symbolCode))
            symbol.scale.set(0.5);
            return symbol;
        } else {
            return this._symbols[symbolCode].pop() ?? new SymbolView(symbolCode, this._loader.getTextureByAssetKey(symbolCode));
        }
    }

    returnSymbol(symbol: SymbolView) {
        if (!this._symbols[symbol.code]) {
            this._symbols[symbol.code] = [];
        }
        this._symbols[symbol.code].push(symbol);
    }
}