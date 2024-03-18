"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eea = exports.gcd = void 0;
const gcd = ({ r0, r1 }) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1];
    }
    return r0;
};
exports.gcd = gcd;
// not w | needed
const eea = ({ r0, r1 }) => {
    let gcdvar, x, y;
    if (r0 == 0) {
        return [r1, 0, 1];
    }
    else {
        [gcdvar, x, y] = (0, exports.eea)({ r0: r1 % r0, r1: r0 });
        return [gcdvar, y - (r1 / r0) * x, x];
    }
};
exports.eea = eea;
//# sourceMappingURL=gcd.js.map