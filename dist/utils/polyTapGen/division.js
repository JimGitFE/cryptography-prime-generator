"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyMod = exports.dividePolynomials = void 0;
const dividePolynomials = ({ dividend, divisor }) => {
    let output = [...dividend];
    let normalizer = divisor[0];
    for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
        output[i] /= normalizer;
        let coef = output[i];
        for (let j = 1; j < divisor.length; j++) {
            output[i + j] += -coef * divisor[j];
        }
    }
    let separator = dividend.length - divisor.length + 1;
    let quotient = output.slice(0, separator);
    let remainder = output.slice(separator);
    return { quotient, remainder };
};
exports.dividePolynomials = dividePolynomials;
// polynomial division remainder, coefficients modulo 2 (default)
// param: array of exponents for the terms with coefficient in GF(2)
const polyMod = ({ dividend, divisor, modulo = 2 }) => {
    // 1. transform to coefficient format
    // ex [2] => [1, 0, 1] // x^2 + 1
    let [coefEnd, coefSor] = [new Array(Math.max(...dividend) + 1).fill(0), new Array(Math.max(...divisor)).fill(0)];
    dividend.forEach((exp) => coefEnd[coefEnd.length - (exp + 1)] = 1);
    divisor.forEach((exp) => coefSor[coefSor.length - exp] = 1);
    coefSor[coefSor.length] = 1;
    // 2. divide
    let result = (0, exports.dividePolynomials)({ dividend: coefEnd, divisor: coefSor });
    return result.remainder.map(x => x % modulo);
};
exports.polyMod = polyMod;
// Example usage
//let dividend = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Represents x + 1
//let divisor: (0 | 1)[] = [1, 1, 0, 0, 1]; // Represents 2x^2 + 3x + 2
// /console.log(dividePolynomials([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1]));
//console.log(polyMod({dividend: [15], divisor: [4,3]})); // Logs the remainder
//# sourceMappingURL=division.js.map