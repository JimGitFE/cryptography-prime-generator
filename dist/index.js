"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primeNth = exports.miller_rabin = exports.millsConstant = exports.lcg = void 0;
const lcg_1 = require("./PRNG/lcg");
Object.defineProperty(exports, "lcg", { enumerable: true, get: function () { return lcg_1.lcg; } });
const miller_rabin_1 = require("./utils/prime/miller_rabin");
Object.defineProperty(exports, "miller_rabin", { enumerable: true, get: function () { return miller_rabin_1.miller_rabin; } });
const mills_1 = require("./utils/prime/mills");
Object.defineProperty(exports, "millsConstant", { enumerable: true, get: function () { return mills_1.millsConstant; } });
Object.defineProperty(exports, "primeNth", { enumerable: true, get: function () { return mills_1.primeNth; } });
//# sourceMappingURL=index.js.map