const gcd = ({r0, r1}: {r0: number, r1: number}) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1]
    }
    return r0
}

console.log(gcd({r0: 973, r1: 301}))