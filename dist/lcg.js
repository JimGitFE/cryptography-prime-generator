"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcg = void 0;
class lcg {
    constructor(seed, a, c, m) {
        this.seed = seed;
        this.a = a;
        this.c = c;
        this.m = m;
    }
    next() {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed / this.m;
    }
}
exports.lcg = lcg;
//# sourceMappingURL=lcg.js.map