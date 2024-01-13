export class lcg {
    private seed: number;
    private a: number;
    private c: number;
    private m: number;

    constructor(seed: number, a: number, c: number, m: number) {
        this.seed = seed;
        this.a = a;
        this.c = c;
        this.m = m;
    }

    next(): number {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed / this.m;
    }
}