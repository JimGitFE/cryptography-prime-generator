interface variables {
    seed?: number,
    a: number, // high multiplicative order modulo m (a - 1 is divisible by all prime factors of m)
    c?: number, // affine transformation || 0
    m: number // prime or power of primes
}

export const lcg = ({seed, a, c = 0, m}: variables) => {
    if (seed === undefined) {
        // Calculate best seed 
    } else {
        return (a * seed + c) % m
    }
}