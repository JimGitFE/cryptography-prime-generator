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

import { expToCoef, polyDiv, polyDivMod } from "./division";
import { polyGcd, removeLZero } from "../gcd";
import { isPrime, compareArrays } from "../math";

// 1. Generate Candidate Polynomials of degree n in GF(2^n)
const computeCandidates = (n: number): (0|1|-1)[][] => {
    let leftOne = 1 << n-1 // 0b100
    let results: (0|1|-1)[][] = [];

    // Combinations of middle bits
    let totalCombinations = Math.pow(2, n-1);

    // Generate bit variants 001 010 100 ...
    for(let variant = 0; variant < totalCombinations; variant++) {
        
        // n = 2, 100 | 10 => 1100 | 1 => 1101 => [1,1,0,1]
        let binary: number[] = ((leftOne|variant)<<1|1).toString(2).split('').map(Number)
        
        // if uneven terms
        if(binary.reduce((a, b) => a + b, 0) % 2 !== 0) {
            results.push(<(0|1)[]>binary);
        }
    }
    
    return results
}

const isPrimitive = (poly: (0|1|-1)[]) => {
    // x ** ((2**degree) -1) mod f(x) = 1
    const n = poly.length-1

    // compute phi order of polynomio 
    let remainder = removeLZero(<(0|1|-1)[]>polyDivMod({dividend: expToCoef([(2**n)-1]), divisor: poly}))

    return compareArrays(remainder, [1])
}

const isIrreducible = (poly: (0|1|-1)[]) => {
    // Array with exponents x^2^n, & prime divisor q of n
    const n = poly.length-1
    const sequence = [2**n]

    // 1.1 Compute all common prime divisors of n
    for(let i = 2; i <= n; i++) {
        if(n % i === 0 && isPrime(i)) {
            sequence.push(2**(n/i));
        }
    }

    // 1.2 See if divisible
    for (let i = 0; i < sequence.length; i++) {
        const x = sequence[i]
        if (i == 0) {
            let gcdRes = polyGcd({p: expToCoef([x,-1]), q: poly, modulo: 2})
            if ( compareArrays(gcdRes, [1]) ) return false
        } else {
            let gcdRes = polyGcd({p: expToCoef([x,-1]), q: poly, modulo: 2})
            if ( !compareArrays(gcdRes, [1]) ) return false
        }
    }

    return true
}

export const generateTaps = (degree: number): any[] => {
    let Taps: number[][] = []
    const possibleTaps = computeCandidates(degree) 
    for (let i = 0; i < possibleTaps.length; i++) {
        const poly = possibleTaps[i]
        console.log("testing",poly)
        if (!isPrimitive(poly)) {
            console.log(false, "failed primitive")
        } else if (!isIrreducible(poly)) {
            console.log(false, "failed irreducible")
        } else {
            console.log(true, "primitive")
            console.log(true, "irreducible")
            Taps.push(<(0|1)[]>poly)
        }
        console.log(Taps)
    }
    return Taps
}


// console.log(generateTaps(20))
console.log(generateTaps(2))

// irreducible
// console.log(isIrreducible(expToCoef([10,3,0])))
// console.log(isIrreducible(blocked))

// reducible
// console.log(isIrreducible(expToCoef([4,2,0])))

// primitive
// console.log(isPrimitive(expToCoef([7,6,0])))
// not primitive
// console.log(isPrimitive(expToCoef([10,3,0])))
console.log(isPrimitive(expToCoef([4,3,2,1,0])))

// prime divisor q of n, what if q = n?

/*
Samples

Not Primitive

x^4+x^3+x^2+x+1 ? from math.stack // false

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