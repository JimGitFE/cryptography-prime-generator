"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcg = void 0;
// const mersennePrimes
class lcg {
    constructor({ seed, a, c, m }) {
        if (seed) {
            this.seed = seed;
        }
        else {
            this.seed = Number(String(Date.now()).slice(-4));
        }
        this.a = a;
        this.c = c ? c : 0;
        this.m = m;
    }
    next() {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed / this.m;
    }
}
exports.lcg = lcg;
// const random = new lcg({a: 82, c: 23, m: 52})
// console.log(random)
// console.log(random.next())
// console.log(random.next())
// console.log(random.next())
//# sourceMappingURL=lcg.js.map