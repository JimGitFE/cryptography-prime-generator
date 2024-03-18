// import { divide } from "mathjs"
import { polyDiv, polyDivMod } from "./polyTapGen/division"

export const gcd = ({r0, r1}: {r0: number, r1: number}) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1]
    }
    return r0
}

// compute gcd for each element
export const arrayGcd = (arr: number[]) => {
    console.log("searcihgn factor", arr)
    if (arr.length == 0) {
        return arr[0]
    } else {
        let result = arr[0]
        arr.forEach(num => {
            result = gcd({r0: num, r1: result})
            if (result == 1) {return result}
        })
        return result
    }
} 

// not w | needed
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

function allZero(array: number[]): boolean {
    return array.every(val => val === 0);
}
const removeLZero = (poly0: (0|1|-1)[]): (0|1|-1)[] => {
    console.log(poly0)
    while (poly0[0] == 0) {
        poly0.shift()
    }
    return poly0
}


// euclidean polynomial gcd
export const polyGcd = ({poly1,poly2, mod = 0}:{poly1: (0|1|-1)[], poly2: (0|1|-1)[], mod?: number}) => {
    while (!allZero(poly2)) {
        console.log("polyGcd received: ",poly1, poly2)
        let remainder: number[]
        if (mod) {
            remainder = polyDivMod({dividend: poly1, divisor: poly2, modulo: mod})
        } else {
            remainder = polyDiv({dividend: poly1, divisor: poly2}).remainder
        }
        console.log("divRes",remainder)
        poly1 = poly2
        poly2 = removeLZero(remainder as (0 | 1 | -1)[])
        // [poly1, poly2] = [poly2, divRes.remainder]
    }
    console.log("seee",allZero(poly2), poly1,poly2)
    return poly1
}

// subresultant algorithm