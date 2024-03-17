// 1. generate candidate polynomials of degree n in GF(2^n)
// 2. uneven taps, and x^0 present (constant term)
// 3. check if polynomial is primitive to GF
// 3.2 phi(n) = 2^n - 1, 
// 3.3 and no smaller will divide p(x)

// 4. check if polynomial is irredcubile
// 4.1 Euclidean Algorithm
// 5. found feedback tap register for degree n

import { dividePolynomials } from "./division";

const primitivePolynomials = {
    1: [[0, 1]],
    2: [[0, 2]],
    3: [[0, 1, 3]],
    4: [[0, 1, 4]],
    5: [[1, 2, 5]],
    6: [[0, 1, 6]],
    7: [[0, 1, 7]],
    8: [[1, 2, 3, 4, 8]]
};


/*
1.
GF(2^3) = {(x^3 + x + 1), (x^3 + x^2 + 1), (x^3 + x^2 + x + 1)}
x^7 / p(x)
3. (x^3 + x + 1), (x^3 + x^2 + 1) both divide x^7, have correct order
4. 

*/
// reducible polynomio: x^4+x^2+1 factors = (1 - x + x^2) (1 + x + x^2)



// console.log(dividePolynomials([1, 0, 0, 0, 1],[1, 1, 0, 1]).remainder); // Logs [0, 0, 0, 1]

function gcd(a: number[], b: number[]): number[] {
    if (allZero(b)) return a;
    return gcd(b, mod(a, b));
}

function allZero(array: number[]): boolean {
    return array.every(val => val === 0);
}

function mod(a: number[], b: number[]): number[] {
    let result = [...a];
    while (result.length >= b.length) {
        for (let i = 0; i < b.length; i++) {
            result[result.length - b.length + i] ^= b[i];
        }
        while (result.length > 0 && result[0] === 0) {
            result.shift();
        }
    }
    return result;
}
/*
x^(2^i) - x for every i between 1 and n-1
ex p(x)modx32 = 0
return false

gcd of primve divisors of n 
x^(2^d) - x for prime divisor d of n
return false

else
return true
*/

function isIrreducible(polynomial: number[], n: number): boolean {
    for (let i = 1; i <= n / 2; i++) {
        let xqSubX = new Array(i + 1).fill(0);
        xqSubX[0] = xqSubX[i] = 1;
        if (!allZero(gcd(polynomial, xqSubX))) {
            return false;
        }
    }
    return true;
}

let polynomial = [1, 0, 0, 1]; // Represents x^3 + 1
// console.log(isIrreducible(polynomial, 3)); // Logs true


// 2024
const expToCoefs = ({dividend, divisor}: {dividend: number[], divisor: number[]}): {dividend: (0 | 1 | -1)[], divisor: (0 | 1 | -1)[]} => {
    let [coefEnd, coefSor] = [new Array(Math.abs(Math.max(...dividend))+1).fill(0), new Array(Math.abs(Math.max(...divisor))+1).fill(0)];
    dividend.forEach((exp) => {
        if (exp == 0) {
            return coefEnd[coefEnd.length-1] = 1
        } else {
            return coefEnd[coefEnd.length - (Math.abs(exp) + 1)] = Math.sign(exp)*1
        }
    });
    divisor.forEach((exp) => {
        if (exp == 0) {
            return coefSor[coefSor.length-1] = 1
        } else {
            return coefSor[coefSor.length - (Math.abs(exp) + 1)] = Math.sign(exp)*1
        }
    });

    console.log("sending", coefEnd, coefSor)
    return {dividend: coefEnd, divisor: coefSor}
}

console.log(dividePolynomials(expToCoefs({dividend: [32,-1], divisor: [10,3,0]})))
// console.log(dividePolynomials(expToCoefs({dividend: [10,3,0], divisor: [32,-1]})))