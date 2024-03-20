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

import { expToCoef, polyDivMod } from "./division";
import { polyGcd, gcd } from "../gcd";

// 1. Generate Candidate Polynomials of degree n in GF(2^n)
const computeCandidates = (n) => {
    let leftOne = 1 << n-2 // 0b100
    let results: number[][] = [];

    // Combinations of middle bits
    let totalCombinations = Math.pow(2, n-2);

    // Generate bit variants 001 010 100 ...
    for(let variant = 0; variant < totalCombinations; variant++) {
        
        // n = 2, 100 | 10 => 1100 | 1 => 1101 => [1,1,0,1]
        let binary: number[] = ((leftOne|variant)<<1|1).toString(2).split('').map(Number)
        
        // if uneven terms
        if(binary.reduce((a, b) => a + b, 0) % 2 !== 0) {
            results.push(binary);
        }
    }
    return results
}

const isPrimitive = (poly: (0|1|-1)[]) => {
}

const isIrreducible = (poly: (0|1|-1)[]) => {
    // array with x^2^n, x^2^(n/q) prime divisor q of n
    const n = (poly.length-1)
    const sequence = [2**n]
    // all common prime divisors of n
    

    // compute gcd for each x^? - x
    sequence.forEach(deg=>{
        let p = expToCoef([deg,-1])
    })
}

// Testing irreducibility of x^10 + x^3 + 1
// let {dividend: p, divisor: q} = expToCoefs({dividend: [127], divisor: [7,6,0]}) // remainder 1 => order check
// let {dividend: p, divisor: q} = expToCoefs({dividend: [1024,-1], divisor: [10,3,0]}) // gcd 1 + x^3 + x^10
// let {dividend: p, divisor: q} = expToCoefs({dividend: [32,-1], divisor: [10,3,0]}) // gcd 1
// let {dividend: p, divisor: q} = expToCoefs({dividend: [4,-1], divisor: [10,3,0]}) // gcd 1

// console.log("RESULT ",polyGcd({p: expToCoef([127]), q: expToCoef([7,6,0]), mod: 2}))
console.log("RESULT ",polyDivMod({dividend: expToCoef([127]), divisor: expToCoef([7,6,0])}))

/*
Samples

Primitive over GF(2^n)

x^7 + x^6 + 1
x^3 + x + 1
x^3 + x^2 + 1

Irreducible polynomials

x^7 + x^6 + 1
x^10 + x^3 + 1
x^3 + x^2 + 1
x^3 + x + 1

Reducible polynomials

x^5+x^4+x^3+x^2+x-1 = (x^2−x−1)(x^3−x^2+x+1)
x^4+x^2+1 factors = (1-x+x^2)(1+x+x^2)
x^5+x^3+x+1 & x^4+x^3+x+1 = (x+1)

 */