import { gcd, arrayGcd } from "../gcd";

const mod = function (num: number, n: number):number {
  "use strict";
  return ((num % n) + n) % n;
};

export const polyDiv = ({dividend, divisor}: {dividend: (0 | 1 | -1)[], divisor: (0 | 1 | -1)[]}) => {
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
}

// 1. transform to coefficient format // ex [2] => [1, 0, 1] // x^2 + 1
export const expToCoefs = ({dividend, divisor}: {dividend: number[], divisor: number[]}): {dividend: (0 | 1 | -1)[], divisor: (0 | 1 | -1)[]} => {
    let [coefEnd, coefSor] = [new Array(Math.abs(Math.max(...dividend))+1).fill(0), new Array(Math.abs(Math.max(...divisor))+1).fill(0)];
    dividend.forEach((exp) => {
        if (exp == 0) {
            return coefEnd[coefEnd.length-1] += 1
        } else {
            return coefEnd[coefEnd.length - (Math.abs(exp) + 1)] += Math.sign(exp)*1
        }
    });
    divisor.forEach((exp) => {
        if (exp == 0) {
            return coefSor[coefSor.length-1] += 1
        } else {
            return coefSor[coefSor.length - (Math.abs(exp) + 1)] += Math.sign(exp)*1
        }
    });

    console.log("from", dividend, divisor, "sending expToCoefs", coefEnd, coefSor)
    return {dividend: coefEnd, divisor: coefSor}
}

// polynomial division remainder, coefficients modulo 2 (default)
// param: array of exponents for the terms with coefficient in GF(2)
export const polyDivMod = ({dividend, divisor, modulo = 2}: {dividend: (0|1|-1)[], divisor: (0|1|-1)[], modulo?: number}) => {    
    // 2. divide
    let result = polyDiv({dividend, divisor});
    console.log("polyDivMod",result)
    let remainderMod = result.remainder.map(x => mod(x, modulo)) 
    let constFactor = arrayGcd(remainderMod)
    console.log("factor: ", (constFactor || 1))
    remainderMod = remainderMod.map(x => x/(constFactor || 1)) 
    return remainderMod;
}

// Example usage
//let dividend = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Represents x + 1
//let divisor: (0 | 1)[] = [1, 1, 0, 0, 1]; // Represents 2x^2 + 3x + 2

// /console.log(polyDiv([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 1]));
//console.log(polyDivMod({dividend: [15], divisor: [4,3]})); // Logs the remainder