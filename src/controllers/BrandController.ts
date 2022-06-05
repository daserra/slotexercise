enum BrandType {
    BASE_GAME = "baseGame"
}

export class BrandController {
    private _selectedBrand = BrandType.BASE_GAME

    constructor(private _brands: Record<string, string[]>) {
    }

    getBrand() {
        return this._brands[this._selectedBrand];
    }
}