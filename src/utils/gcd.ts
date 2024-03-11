export const gcd = ({r0, r1}: {r0: number, r1: number}) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1]
    }
    return r0
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