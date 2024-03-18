"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lfsr = void 0;
class lfsr {
    constructor({ seed }) {
        if (seed) {
            this.seed = seed;
        }
        else {
            this.seed = (1 << 4) | 1;
        }
    }
    next() {
        let newB = (this.seed ^ (this.seed >> 1)) & 1;
        this.seed = (this.seed >> 1) | (newB << (4 - 1));
        return this.seed & 1;
    }
}
exports.lfsr = lfsr;
const rand = new lfsr({});
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
console.log(rand.next());
//# sourceMappingURL=lfsr.js.map