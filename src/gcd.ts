const gcd = ({r0, r1}: {r0: number, r1: number}) => {
    console.log('gcd');
    let modulus = 1;
    let rl = r0
    let rn = r1
    while (modulus !== 0) {
        modulus = rl % rn
        rl = rn
        rn = modulus
        if (modulus === 0) {
            return rl
        }
    }
}

console.log(gcd({r0: 973, r1: 301}))