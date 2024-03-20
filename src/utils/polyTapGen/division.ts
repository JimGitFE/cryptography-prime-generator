import { arrayGcd } from "../gcd";

// Modulo Operation
const mod = function (num: number, n: number):number {
  return ((num % n) + n) % n;
};

// Polynomial Division
export const polyDiv = ({dividend, divisor}: {dividend: (0 | 1 | -1)[], divisor: (0 | 1 | -1)[]}) => {
    let output = [...dividend];
    let normalizer = divisor[0];

    // 1.1 Compute outputs for the difference of exponents
    for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
        // 1.2 Generate new Coefficient
        output[i] /= normalizer;
        let coef = output[i];

        // 1.3 Insert coefficient at exponent position
        for (let j = 1; j < divisor.length; j++) {
            output[i + j] += -coef * divisor[j];
        }
    }

    // 1.4 Separate quotient from remainder
    let separator = dividend.length - divisor.length + 1;
    let [quotient, remainder] = [output.slice(0, separator), output.slice(separator)]

    return { quotient, remainder };
}

// Format from exponents to coefficients type // ex [2] => [1, 0, 1] // x^2 + 1
// params: array of exponents for the terms with coefficient in GF(2), ex [22] = [1,0,0,0,...]
export const expToCoef = (exponentArr: number[]): (0 | 1|-1)[] => {
    
    //  1.1 Define arrays with length = polynomial degree + 1
    let coefArr = new Array(Math.abs(Math.max(...exponentArr))+1).fill(0)
    
    //  1.2 Add 1 at each exponent positions, ex. [1,1] => [2,0]
    exponentArr.forEach((exp) => {
        if (exp == 0) {
            return coefArr[coefArr.length-1] += 1 // Math.sign(0) = 0 => avoid 1*0
        } else {
            return coefArr[coefArr.length - (Math.abs(exp) + 1)] += Math.sign(exp)*1
        }
    });

    return [...coefArr]
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