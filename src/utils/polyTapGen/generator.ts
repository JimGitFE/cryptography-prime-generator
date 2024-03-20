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

import { expToCoefs, polyDivMod } from "./division";
import { polyGcd } from "../gcd";

// 1. Generate Candidate Polynomials of degree n in GF(2^n)
let candidatePolynomials = []

// Testing irreducibility of x^10 + x^3 + 1
let {dividend: p, divisor: q} = expToCoefs({dividend: [127], divisor: [7,6,0]}) // gcd 1 + x^3 + x^10
// let {dividend: p, divisor: q} = expToCoefs({dividend: [1024,-1], divisor: [10,3,0]}) // gcd 1 + x^3 + x^10
// let {dividend: p, divisor: q} = expToCoefs({dividend: [32,-1], divisor: [10,3,0]}) // gcd 1
// let {dividend: p, divisor: q} = expToCoefs({dividend: [4,-1], divisor: [10,3,0]}) // gcd 1

console.log("RESULT ",polyGcd({p, q, mod: 2}))
console.log("RESULT ",polyDivMod({dividend: p,divisor: q}))

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