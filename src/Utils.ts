import {DisplayObject} from "pixi.js";
import {Payout} from "./controllers/WinController";

export async function sleepForMs(msTime: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, msTime));
}

export function destroyPixiObject(object: DisplayObject) {
    object.parent.removeChild(object);
    object.removeAllListeners();
    object.destroy();
}

export function getRandomPositionFromArray(array: unknown[]): number {
    return Math.floor(Math.random() * (array.length));
}

export function formatPayoutsToText(payouts: Payout[]) {
    return payouts.map(({
                            line,
                            symbolCode,
                            numberOfSymbols,
                            amount
                        }) => `- payLine ${line}, ${symbolCode} x${numberOfSymbols}, ${amount}\n`).join('');
}

export function getLeftToRightSameSymbolCount(expectedSymbol: string, symbols: string[]) {
    let sameSymbolsCount = 0;
    for (const symbol of symbols) {
        if (symbol === expectedSymbol) {
            sameSymbolsCount++;
        } else {
            break;
        }
    }
    return sameSymbolsCount;
}

export function getParameterFromUrl(parameter: string) {
    const value = new URL(window.location.href).searchParams.get(parameter);
    return value === null ? undefined : value;
}

export const brandsMap: Record<number, Record<string, string[]>> = {
    0: {"baseGame": ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"]},
    1: {"baseGame": ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"]},
    2: {"baseGame": ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"]},
    3: {"baseGame": ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"]},
    4: {"baseGame": ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]},
}

export const symbolsPayoutMap: Record<string, Record<number, number>> = {
    "hv1": {
        3: 10,
        4: 20,
        5: 50
    },
    "hv2": {
        3: 5,
        4: 10,
        5: 20
    },
    "hv3": {
        3: 5,
        4: 10,
        5: 15
    },
    "hv4": {
        3: 5,
        4: 10,
        5: 15
    },
    "lv1": {
        3: 2,
        4: 5,
        5: 10
    },
    "lv2": {
        3: 1,
        4: 2,
        5: 5
    },
    "lv3": {
        3: 1,
        4: 2,
        5: 3
    },
    "lv4": {
        3: 1,
        4: 2,
        5: 3
    },
}

export const payLineMap: Record<number, number[]> = {
    1: [1, 1, 1, 1, 1],
    2: [0, 0, 0, 0, 0],
    3: [2, 2, 2, 2, 2],
    4: [0, 0, 1, 2, 2],
    5: [2, 2, 1, 0, 0],
    6: [0, 1, 2, 1, 0],
    7: [2, 1, 0, 1, 2],
}
