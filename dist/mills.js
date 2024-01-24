"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primeNth = exports.millsConstant = void 0;
exports.millsConstant = 1.3063778838630806904686144926;
const primeNth = (n) => {
    return Math.round(Math.pow(exports.millsConstant, Math.pow(3, n)));
};
exports.primeNth = primeNth;
//# sourceMappingURL=mills.js.map