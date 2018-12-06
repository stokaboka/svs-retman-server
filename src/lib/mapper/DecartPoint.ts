
export default class DecartPoint {
    public x: any = '';
    public y: any = '';
    constructor (x: any, y: any) {
        this.x = x;
        this.y = y;
    }

    public toString() {
        return `x:${this.x} y:${this.y}`;
    }
}
