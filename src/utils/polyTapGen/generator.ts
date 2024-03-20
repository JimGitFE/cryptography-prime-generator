/* 

Maximum Length Feedback Shift Register Polynomial Generator for LFSR

1. generate candidate polynomials of degree n in GF(2^n)
1.1 uneven taps, and x^0 present (constant term)

2. check if polynomial is primitive to GF(2^n)
2.1 phi(n) = 2^n - 1, maximum order
2.2 and no smaller will divide p(x)

3. check if polynomial is irreducible in GF(2^n)
3.1 polynomial divides x^2^n - x, gcd equal to polynomial
3.2 polynomial gcd with x^2^(n/q) - x = 1 for each prime divisor q of n, ex. n=10, q=[5,2]

4. Found
*/

/* 
Example
1.
GF(2^3) = {(x^3 + x + 1), (x^3 + x^2 + 1), (x^3 + x^2 + x + 1)}
x^7 / p(x)
3. (x^3 + x + 1), (x^3 + x^2 + 1) both divide x^7, have correct order
4. 

*/

import { expToCoefs } from "./division";
import { polyGcd } from "../gcd";

// Copilot Method output
function gcd(a: number[], b: number[]): number[] {
    // until all zero
    if (allZero(b)) return a;
    // compute remainder of inverted variables
    return gcd(b, mod(a, b));
}

function allZero(array: number[]): boolean {
    return array.every(val => val === 0);
}

// poly mod from copilot, didnt work inf loop
function mod(a: number[], b: number[]): number[] {
    let result = [...a];
    while (result.length >= b.length) {
        for (let i = 0; i < b.length; i++) {
            result[result.length - b.length + i] ^= b[i];
        }
        while (result.length > 0 && result[0] === 0) {
            result.shift();
            // had infinte loop

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
        // for every int until degree / 2
        let xqSubX = new Array(i + 1).fill(0);
        xqSubX[0] = xqSubX[i] = 1;
        // ex. [1,0,0,0,1]
        // ex. [1,0,0,1]
        // ex. [1,0,1]

        // if its not all zero, thus xqsubx has a gcd => divides polynomial, then its a factor 
        if (!allZero(gcd(polynomial, xqSubX))) {
            return false;
        }
        // else its irreducible
    }
    return true;
}

// 2024


// let {dividend: p, divisor: q} = expToCoefs({dividend: [1024,-1], divisor: [10,3,0]}) // gcd 1 + x^3 + x^10
let {dividend: p, divisor: q} = expToCoefs({dividend: [32,-1], divisor: [10,3,0]}) // gcd 1
// let {dividend: p, divisor: q} = expToCoefs({dividend: [5,3,1,0], divisor: [4,3,1,0]}) // gcd x+1
// let {dividend: p, divisor: q} = expToCoefs({dividend: [4,-1], divisor: [10,3,0]}) // gcd 1

// let {dividend: p, divisor: q} = expToCoefs({dividend: [3,2,2,1,1,1,0,0], divisor: [2,0,0,0,0]}) // gcd x+1
// let {dividend: p, divisor: q} = expToCoefs({dividend: [3,1,0], divisor: [2,1,0]})
// 
console.log("RESULT ",polyGcd({p, q, mod: 2}))

/*
Samples

Irreducible polynomials

x^10 + x^3 + 1

Reducible polynomials

x^5+x^4+x^3+x^2+x-1 = (x^2−x−1)(x^3−x^2+x+1)
x^4+x^2+1 factors = (1-x+x^2)(1+x+x^2)

 */