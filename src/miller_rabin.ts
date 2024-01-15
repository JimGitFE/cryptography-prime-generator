// n to be tested 
// a rand coprime to n? a < n-1, base
// d odd number such that n-1 = 2^r * d?
// a^d % n = 1 or n-1

// Miller-Rabin primality test

export const miller_rabin = ({ n, k }:{ n:number, k:number }): boolean => {
    if (n === 2 || n === 3) return true;
    if (n <= 1 || n % 2 === 0) return false;

    let [r, d] = getKM(n - 1);
    for (let i = 0; i < k; i++) {
        //  suggested a floor ran * n (needed => a < n-1, floor = n -1)
        const a = Math.floor(Math.random() * (n - 2)) + 2;
        let x = modPow(a, d, n);
        if (x === 1 || x === n - 1) continue;
        let continueLoop = false;
        for (let j = 0; j < r - 1; j++) {
            x = modPow(x, 2, n);
            if (x === n - 1) {
                continueLoop = true;
                break;
            }
        }
        if (continueLoop) continue;
        return false;
    }
    return true;
}

// calculate k & m
function getKM(num: number) {
    let k = 0
    let m = num
    // while even
    while (m % 2 === 0) {
        m /= 2
        k++
    }
    // return k, m
    return [k, m];
}

// calculate (base ^ exponent) % modulus modular exponentiation
function modPow(base: number, exponent: number, modulus: number) {
    // return base**exponent % modulus unefficient & inaccurate 
    if (modulus === 1) return 0;
    let result = 1
    base = base % modulus;
    while (exponent > 0) {
        // halving unless odd
        if (exponent % 2 === 1) result = (result * base) % modulus;
        // exponent halving until 0 (binary shift)
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

const tbase = 24
const texponent = 422
const tmodulus = 10

const startTime1 = Date.now()
console.log(modPow(tbase, texponent, tmodulus))
const endTime1 = Date.now();
console.log(`modPow Execution time: ${endTime1 - startTime1} ms`);

const startTime2 = Date.now()
console.log(tbase**texponent%tmodulus)
const endTime2 = Date.now();
console.log(`math operation Execution time: ${endTime2 - startTime2} ms`);
// console.log(miller_rabin({ n: 11, k: 1 }), "miller_rabin({ n: 2, k: 1 })")