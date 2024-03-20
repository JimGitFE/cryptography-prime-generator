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
let candidatePolynomials = []
const computeCandidates = () => {
    
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