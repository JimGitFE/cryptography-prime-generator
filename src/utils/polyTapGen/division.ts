import { arrayGcd } from "../gcd";

// Modulo Operation
const mod = function (num: number, n: number):number {
  return ((num % n) + n) % n;
};

// Polynomial Division
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

// Format from exponents to coefficients type // ex [2] => [1, 0, 1] // x^2 + 1
// params: array of exponents for the terms with coefficient in GF(2), ex [22] = [1,0,0,0,...]
export const expToCoefs = ({dividend, divisor}: {dividend: number[], divisor: number[]}): {dividend: (0 | 1 | -1)[], divisor: (0 | 1 | -1)[]} => {

    //  1.1 Define arrays with length = polynomial degree + 1
    let [coefEnd, coefSor] = [new Array(Math.abs(Math.max(...dividend))+1).fill(0), new Array(Math.abs(Math.max(...divisor))+1).fill(0)];

    //  1.2 Add 1 at each exponent positions, ex. [1,1] => [2,0]
    dividend.forEach((exp) => {
        if (exp == 0) {
            return coefEnd[coefEnd.length-1] += 1 // Math.sign(0) = 0 => avoid 1*0
        } else {
            return coefEnd[coefEnd.length - (Math.abs(exp) + 1)] += Math.sign(exp)*1
        }
    });
    //  1.2 Add 1 at each exponent positions, ex. [1,1] => [2,0]
    divisor.forEach((exp) => {
        if (exp == 0) {
            return coefSor[coefSor.length-1] += 1 // Math.sign(0) = 0 => avoid 1*0
        } else {
            return coefSor[coefSor.length - (Math.abs(exp) + 1)] += Math.sign(exp)*1
        }
    });

    return {dividend: coefEnd, divisor: coefSor}
}

// Polynomial Division remainder, coefficients modulo 2 (default)
// params: coefficients array type, ex. [3,0,1] not [2,2,2,1] // 3x^2+1
export const polyDivMod = ({dividend, divisor, modulo = 2}: {dividend: (0|1|-1)[], divisor: (0|1|-1)[], modulo?: number}) => {    
    
    // 1.1 Polynomial Division
    let result = polyDiv({dividend, divisor});

    // 1.2 modulo result, for GF(2) mod 2
    let remainderMod = result.remainder.map(x => mod(x, modulo)) 
    
    // 1.3 remove constant factor, ex 4x+4 => 4(x+1) => x+1 
    let constFactor = arrayGcd(remainderMod) // if 0 => then constant factor = 1 to avoid 0/0 = NaN
    remainderMod = remainderMod.map(x => x/(constFactor || 1)) 

    return remainderMod;
}