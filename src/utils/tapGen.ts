function dividePolynomials(dividend: number[], divisor: number[]) {
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

export const polyDivRemainderModulo = ({dividend, divisor, modulo = 2}: {dividend: (0 | 1)[], divisor: (0 | 1)[], modulo?: number}) => {
    let result = dividePolynomials(dividend, divisor);
    return result.remainder.map(x => x % modulo);
}

// Example usage
let dividend = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Represents x + 1
let divisor: (0 | 1)[] = [1, 1, 0, 0, 1]; // Represents 2x^2 + 3x + 2

console.log(polyDivRemainderModulo({dividend: [0, 0, 1], divisor})); // Logs the remainder