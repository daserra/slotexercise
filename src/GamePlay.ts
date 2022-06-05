import {GameEngine} from "./GameEngine";
import {SpinButtonController} from "./controllers/SpinButtonController";
import {Container} from "pixi.js";
import {CANVAS_SETTINGS} from "./GameRenderer";
import {SlotController} from "./controllers/SlotController";
import {SymbolsPool} from "./SymbolsPool";
import {WinController} from "./controllers/WinController";
import {CheatController} from "./controllers/CheatController";

export class GamePlay {

    private _spinButton: SpinButtonController;
    private _uiContainer: Container;
    private _gameContainer: Container;
    private _slotController: SlotController;
    private _winController: WinController;
    private _cheatController: CheatController;

    constructor(private readonly _gameEngine: GameEngine) {
        this._gameContainer = new Container();
        this._uiContainer = new Container();
        this._gameEngine.renderer.rootContainer.addChild(this._gameContainer);
        this._gameEngine.renderer.rootContainer.addChild(this._uiContainer);
        this._spinButton = new SpinButtonController(this._uiContainer, this._gameEngine.loader.getTextureByAssetKey("spin_button"));
        this._slotController = new SlotController(new SymbolsPool(this._gameEngine.loader), this._gameContainer, 200);
        this._winController = new WinController(this._uiContainer);
        this._cheatController = new CheatController();
    }

    prepareUI() {
        this._spinButton.changePosition({
            x: CANVAS_SETTINGS.coordinates.center.x + 400,
            y: CANVAS_SETTINGS.coordinates.center.y + 200
        });
        this._spinButton.activate();
        this._winController.changePosition({
            x: CANVAS_SETTINGS.coordinates.center.x - 400,
            y: CANVAS_SETTINGS.coordinates.center.y + 180
        });
    }

    prepareSlot() {
        this._slotController.setupReels(5, 3)
        this._slotController.changePosition({x: 200, y: 150});
        this.addCheats();
    }

    async startRound() {
        await this._spinButton.waitForClick();
        this._winController.clearWinning();
        this.updateReels();
        this._winController.calculateWinnings(this._slotController.getReelsSymbols())
    }

    private updateReels() {
        this._cheatController.hasCheat() ? this._slotController.updateReelsByIndexes(this._cheatController.dequeueCheat()) : this._slotController.updateReelsRandomly();
    }

    private addCheats() {
        this._cheatController.queueCheat([
            {reelIndex: 0, brandIndex: 0},
            {reelIndex: 1, brandIndex: 11},
            {reelIndex: 2, brandIndex: 1},
            {reelIndex: 3, brandIndex: 10},
            {reelIndex: 4, brandIndex: 14}]);
    }


}