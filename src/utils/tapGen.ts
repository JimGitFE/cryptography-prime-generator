function polySum(arr1: number[], arr2: number[]) {
    let newarr:number[] = []
    arr1.forEach(num => {
            let [inPos, inNeg] = [arr2.indexOf(num), arr2.indexOf(-num)];
            if (inNeg !== -1 && num !== 0) {
                // remove from arr2 and filter from arr1
                arr2.splice(inNeg, 1);
                return false;
            } else if (inPos !== -1) {
                // add to arr1 and remove from arr2
                arr2.splice(inPos, 1);
                newarr.push(num);
            }
            newarr.push(num);
    });
    return [...newarr, ...arr2];
}

function dividePolynomials(dividend: (0 | 1)[], divisor: (0 | 1)[]) {
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

// polynomial division remainder, coefficients modulo 2 (default)
export const polyMod = ({dividend, divisor, modulo = 2}: {dividend: number[], divisor: number[], modulo?: number}) => {
    
    // transform to coefficient format, ex [2] => [1, 0, 1] // x^2 + 1
    let [coefEnd, coefSor] = [new Array(Math.max(...dividend)).fill(0), new Array(Math.max(...divisor)).fill(0)];
    dividend.forEach((exp) => coefEnd[coefEnd.length - exp] = 1);
    divisor.forEach((exp) => coefSor[coefSor.length - exp] = 1);
    coefSor[coefSor.length] = 1;
    
    let result = dividePolynomials(coefEnd, coefSor);
    return result.remainder.map(x => x % modulo);
}

// Example usage
//let dividend = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Represents x + 1
//let divisor: (0 | 1)[] = [1, 1, 0, 0, 1]; // Represents 2x^2 + 3x + 2

console.log(polyMod({dividend: [15], divisor: [4,3]})); // Logs the remainder