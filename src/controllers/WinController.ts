import {VisualController} from "./VisualController";
import {destroyPixiObject, symbolsPayoutMap, payLineMap, getLeftToRightSameSymbolCount} from "../Utils";
import {WinView} from "../views/WinView";
import {Container, IPointData} from "pixi.js";

export type Payout = {
    line: string,
    symbolCode: string,
    numberOfSymbols: number,
    amount: number;
}

export class WinController implements VisualController {

    private readonly _view: WinView;

    constructor(winContainer: Container) {
        this._view = new WinView();
        winContainer.addChild(this._view);
    }

    calculateWinnings(reels: Record<number, string[]>) {
        let payouts: Payout[] = [];
        for (let payLineId in payLineMap) {
            const lineSymbols = payLineMap[payLineId].map((symbolIndex, reelIndex) => reels[reelIndex][symbolIndex]);
            const firstSymbol = lineSymbols[0]
            const sameSymbolCount = getLeftToRightSameSymbolCount(firstSymbol, lineSymbols);
            const amountWon = symbolsPayoutMap[firstSymbol][sameSymbolCount];
            if (amountWon) {
                payouts.push({
                    line: payLineId,
                    symbolCode: firstSymbol,
                    numberOfSymbols: sameSymbolCount,
                    amount: amountWon
                });
            }
        }
        if (payouts.length > 0) {
            this.updateWinInformation(payouts);
        }

    }

    changePosition(position: IPointData) {
        this._view.position.set(position.x, position.y);
    }

    clearWinning() {
        this._view.clearWinning();
    }

    destroy() {
        destroyPixiObject(this._view)
    }

    private updateWinInformation(payouts: Payout[]) {
        const totalWin = payouts.reduce((acc, payout) => acc + payout.amount, 0);
        this._view.addPayoutsInfo(payouts, totalWin)
    }
}