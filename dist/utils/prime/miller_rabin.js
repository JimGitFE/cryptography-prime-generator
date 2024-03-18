"use strict";
// n to be tested such that odd & n > 2
// a rand coprime to n? a < n-1, base
// d odd number such that n-1 = 2^r * d?
// a^d % n = 1 or n-1
Object.defineProperty(exports, "__esModule", { value: true });
exports.miller_rabin = void 0;
// Miller-Rabin primality test
const miller_rabin = ({ n, k: repetitions = 3 }) => {
    let [k, m] = getKM(n - 1);
    console.log('k,m', k, m);
    for (let i = 0; i < repetitions; i++) {
        //  suggested a floor ran * n (needed => a < n-1, floor = n -1)
        // const a = Math.floor(Math.random() * (n - 2)) + 2;
        const a = 2;
        let b = modPow(a, m, n);
        // a witness for probable  => next iteration
        console.log(`b${0}: ${b} rep: ${i} at a: ${a}`);
        if (b === 1 || b === n - 1)
            continue;
        let continueLoop = false;
        // repeat k times b^2mod(n)
        for (let j = 0; j < k - 1; j++) {
            b = modPow(b, 2, n);
            console.log(`b${1 + j}`, b);
            // n-1 => a witness for probable prime => next iteration (avoid pseudo prime, a liar)
            if (b === n - 1) {
                continueLoop = true;
                break;
            }
        }
        if (continueLoop)
            continue;
        return false;
    }
    return true;
};
exports.miller_rabin = miller_rabin;
// calculate k & m such that n−1 = 2^k*m
function getKM(num) {
    let k = 0;
    let m = num;
    // while even
    while (m % 2 === 0) {
        m /= 2;
        k++;
    }
    // return k, m
    return [k, m];
}
function modPow(base, exponent, modulus) {
    // return base**exponent % modulus unefficient & inaccurate (or NaN)
    // sample 24**293 % 587 = 1
    if (modulus === 1)
        return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        // halving unless odd
        if (exponent % 2 === 1)
            result = (result * base) % modulus;
        // exponent halving until 0 (binary shift)
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}
// 587 k 1 m 293
// primess:251 7873 7907 7901 7121
// compostes: 6321
console.log((0, exports.miller_rabin)({ n: 6321 }), "miller_rabin({ n: 2, k: 1 })");
// console.log(getKM(586))
// console.log(getKM(560))
// console.log(modPow((Math.floor(Math.random() * (587 - 2)) + 2), 293, 587))
// console.log(modPow((Math.floor(Math.random() * (587 - 2)) + 2), 293, 587))
// console.log(modPow((Math.floor(Math.random() * (587 - 2)) + 2), 293, 587))
// console.log(modPow((Math.floor(Math.random() * (587 - 2)) + 2), 293, 587))
// console.log(24**293 % 587)
//# sourceMappingURL=miller_rabin.js.map