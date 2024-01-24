"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcg = void 0;
const lcg = (seed, a, c, m) => {
    return (a * seed + c) % m;
};
exports.lcg = lcg;
//# sourceMappingURL=lcg.js.map