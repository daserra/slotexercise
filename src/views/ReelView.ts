import {Container, Sprite, Text} from "pixi.js";
import {SymbolView} from "./SymbolView";

export class ReelView extends Container {

    private _symbolsContainer: Container;
    private _indexText: Text;

    constructor() {
        super();
        this._symbolsContainer = new Container();
        this.addChild(this._symbolsContainer);
        this._indexText = new Text("Index 1");
        this._indexText.position.set(-40, -100);
        this.addChild(this._indexText);
    }

    get symbols() {
        return this._symbolsContainer.children as Array<SymbolView>;
    }

    addSymbol(symbol: SymbolView) {
        symbol.anchor.set(0.5);
        symbol.y = this.resolveSymbolPosition();
        this._symbolsContainer.addChild(symbol);
    }

    removeAllSymbols() {
        this._symbolsContainer.removeChildren();
    }

    updateIndexHeader(index: number) {
        this._indexText.text = `Index ${index}`;
    }

    private resolveSymbolPosition() {
        if (this._symbolsContainer.children.length > 0) {
            const lastChild = this._symbolsContainer.getChildAt(this._symbolsContainer.children.length - 1) as Sprite;
            return lastChild.y + lastChild.height;
        }
        return 0;
    }

}