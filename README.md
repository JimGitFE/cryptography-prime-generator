# cryptography-prime-generator

## **Miller-Rabin** Composite Validator

## **Midsquare** Generator



## **LCG** Linear Congruential Generator

### X<sub>n+1</sub> = (aX<sub>n</sub> + c) mod m  

m, 0 < m - Modulus
a, 0 < a < m - Multiplier
c, 0 ≤ c < m - Increment
X<sub>0</sub>, 0 ≤ X<sub>0</sub> < m - Seed

**Lehmer RNG** period: m - 1

m, prime
a, primitive modulo m
c, 0

Tools: Mersenne primes & primitiveF

a 3 | 5
m 7

**Hull–Dobell Theorem** period: m

m & c, coprime c ≠ 0
a - 1, divisible by all prime factors of m
a - 1, divisible by 4 if m divisible by 4

Tools: gcd 0

a 5
c = 17
m 2**3
<, <>>, ≤, ≥<<

## **LFSR** Linear-Feedback Shift Register Generator

![16-bit LFSR.](/public/16-bit_lfsr.jpg)
X<sub>0</sub> = 0xACE1, X<sub>1</sub> = 0x5670, Taps: [16,14,13,11]

function lfsr(seed) {
    let newB = (seed ^ (seed >> 1)) & 1
    console.log(newB, "new")
    return (seed >> 1) | (newB << 3)
}

sxor last value and shifted new last value

& 1 takes last value only

function lfsr(seed, length) {
    let newB = (seed ^ (seed >> 1)) & 1
    console.log(newB, "new")
    return (seed >> 1) | (newB << (length - 1))
}

last bit always tap
taps xored3

taps even
primitive to galois (2+´´´´)

2024
bits positioned at [taps] get xored

- how to choose taps?
- even taps primitive to GF? soultion?

Irreducibility:

Order: The order of a polynomial is the smallest positive integer n such that the polynomial divides x^n - 1. For a polynomial to be primitive, n must be the maximum possible period, which is the size of the field minus 1 (for GF(2^n), this would be 2^n - 1). source copilot

- generate irreducible polynomial degree n (n = bit count)
- check if primitive
- primitive => to taps