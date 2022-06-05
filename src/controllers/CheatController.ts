export type ReelBrandIndexes = Array<{ reelIndex: number, brandIndex: number }>

export class CheatController {

    private readonly _cheatQueue: Array<ReelBrandIndexes> = [];

    queueCheat(cheat: ReelBrandIndexes) {
        this._cheatQueue.push(cheat);
    }

    dequeueCheat() {
        const cheat = this._cheatQueue.shift();
        if (!cheat) {
            throw new Error(`There is no cheat available`);
        }
        return cheat;
    }

    hasCheat() {
        return this._cheatQueue.length > 0;
    }
}