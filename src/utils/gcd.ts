import { polyDiv, polyDivMod } from "./polyTapGen/division"

// Euclidean GCD of two numbers
export const gcd = ({r0, r1}: {r0: number, r1: number}) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1]
    }
    return r0
}

// Compute gcd of many numbers
export const arrayGcd = (arr: number[]) => {
    if (arr.length == 0) {
        return arr[0]
    } else {
        let result = arr[0]
        arr.forEach(num => {
            result = gcd({r0: num, r1: result})
            if (result == 1) {return result} // stop computing

        })
        return result
    }
} 

// Extended Euclidean Aalgorithm not w | needed
export const eea = ({r0, r1}: {r0: number, r1: number}): [any, number, number] => {
    let gcdvar, x, y
    if (r0 == 0) {
        return [r1, 0, 1]
    }
    else {
        [gcdvar, x, y] = eea({r0: r1 % r0, r1: r0})
        return [gcdvar, y - (r1 / r0) * x, x]   
    }
}

// return true on array of zeroes, ex. [0,0] => true, [0,1] => false
function allZero(array: number[]): boolean {
    return array.every(val => val === 0);
}

// Remove left zeroes from array, ex. [0,1] => [1]
const removeLZero = (poly0: (0|1|-1)[]): (0|1|-1)[] => {
    while (poly0[0] == 0) {
        poly0.shift()
    }
    return poly0
}


// Euclidean GCD of Polynomials Modulo some number, 
// returns & inputs coefficients array, ex. [3,0,1] 3x^2+1 not [2,2,2,1]
export const polyGcd = ({p,q, mod = 0}:{p: (0|1|-1)[], q: (0|1|-1)[], mod?: number}) => {

    // 1.1 Loop until remainder is 0, then gcd(p,q) = previous remainder
    while (!allZero(q)) {
        let remainder: number[]

        // 1.2 Compute Remainder
        console.log("dividing", p, q)
        if (mod) {remainder = polyDivMod({dividend: p, divisor: q, modulo: mod})}
        else {remainder = polyDiv({dividend: p, divisor: q}).remainder}

        p = q
        q = removeLZero(remainder as (0 | 1 | -1)[]) // remainder can contain left zero
    }
    
    return p // p is d / d divides p & q 
}

// subresultant algorithm