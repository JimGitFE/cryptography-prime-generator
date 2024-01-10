"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primeNth = void 0;
const millsConstant = 1.3063778838630806904686144926;
const primeNth = (n) => {
    return Math.round(Math.pow(millsConstant, Math.pow(3, n)));
};
exports.primeNth = primeNth;
console.log((0, exports.primeNth)(4), "prime 4");
//# sourceMappingURL=index.js.map