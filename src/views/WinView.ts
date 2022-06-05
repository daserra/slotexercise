import {Container, Text, TextStyle} from "pixi.js";
import {Payout} from "../controllers/WinController";
import {formatPayoutsToText} from "../Utils";

export class WinView extends Container {

    private readonly _winDetails: Text;
    private readonly _totalWin: Text;

    constructor() {
        super();
        this._totalWin = new Text("", new TextStyle({fontSize: 23}));
        this.addChild(this._totalWin);
        this._winDetails = new Text("", new TextStyle({fontSize: 20}));
        this._winDetails.y = 30;
        this.addChild(this._winDetails);
    }

    clearWinning() {
        this._totalWin.text = "";
        this._winDetails.text = "";
    }

    addPayoutsInfo(payouts: Payout[], totalWin: number) {
        this._totalWin.text = `Total wins: ${totalWin}`;
        this._winDetails.text = `${formatPayoutsToText(payouts)}`
    }
}