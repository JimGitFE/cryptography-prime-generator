import { arrayGcd } from "../gcd";
import { mod } from "../math";

// Polynomial Division
export const polyDiv = ({dividend, divisor, modulo = 0}: {dividend: number[], divisor: number[], modulo?: number}) => {
    let output = [...dividend];
    let normalizer = divisor[0];

    // 1.1 Compute outputs for the difference of exponents
    for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
        // 1.2 Generate new Coefficient
        output[i] /= normalizer;
        let coef = output[i];

        // 1.3 Insert coefficient at exponent position
        for (let j = 1; j < divisor.length; j++) {
            let coef2 = (-coef * divisor[j])
            // output[i + j] += -coef * divisor[j];

            // 1.4 Dividend - Result Modulo (coef already negative) 
            output[i + j] = <(0|1)>mod(coef2 + output[i + j],2); // 0|1 for GF(2)
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
    let {remainder} = polyDiv({dividend, divisor, modulo});
    
    return remainder;
}

// function polynomialDivision(dividend, divisor) {
//     let quotient = []
//     let output = [...dividend]
//     let remainder = [...dividend];
//     let coefficient
    
//     for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
        
//         // 1.1 Compute quotient
//         // [1,0,0,0,0,0,0,0,0,0] 11
//         coefficient = remainder[i]/divisor[0]
//         quotient[i] = coefficient
        
//         // 1.2 Multiply result with divisor
//         // [1,0,0,0,0,0,0,0] * [1,1,0,0,1]
//         // [1,1,0,0,1,0,0,0,0] 15 14 11
//         for (let j = 0; j < divisor.length; j++) {
//             let exp = divisor.length - j
//             coefficient = -quotient[i]*divisor[j]
//         // 1.3 Subtract dividend with output
//             remainder[i+j] += coefficient
//         }
        
        
        
//         console.log(quotient, remainder, output)
        
//     }
    
// }