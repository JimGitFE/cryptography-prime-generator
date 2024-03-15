interface variables {
    seed?: number,
    a: number, // high multiplicative order modulo m (a - 1 is divisible by all prime factors of m)
    c?: number, // affine transformation || 0
    m: number // prime or power of primes
}

// const mersennePrimes

export class lcg {
    private seed: number;
    private a: number;
    private c: number;
    private m: number;

    constructor({seed, a, c, m}: variables) {
        if (seed) {
            this.seed = seed;
        } else {
            this.seed = Number(String(Date.now()).slice(-4))
        }
        this.a = a;
        this.c = c?c:0;
        this.m = m;
    }

    next(): number {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed / this.m;
    }
}

// const random = new lcg({a: 82, c: 23, m: 52})

// console.log(random)
// console.log(random.next())
// console.log(random.next())
// console.log(random.next())