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

# **LFSR** Linear-Feedback Shift Register Generator
![16-bit LFSR.](/public/16-bit_lfsr.jpg)
X<sub>0</sub> = 0xACE1, X<sub>1</sub> = 0x5670, Taps: [16,14,13,11]

Out of a polynomial, each exponent represents a tapped bit, counting from the left, being the constant term the input to the first bit (i.e. x0, which is equivalent to 1). Bits get exored and shifted with the new value. Output last value (& 1).

##### sources: [wikipedia](https://en.m.wikipedia.org/wiki/Linear-feedback_shift_register)

function lfsr(seed, length) {
    let newB = (seed ^ (seed >> 1)) & 1
    console.log(newB, "new")
    return (seed >> 1) | (newB << (length - 1))
}

## Maximum Cycle Length 2<sup>n</sup> - 1

For when the following requirements hold, this process will generate 2<sup>n</sup> − 1 pseudo random bits before repeating the same sequence.

- Primitive polynomial of degree n over GF(2).
- The number of taps is even.
- The set of taps is setwise co-prime.

##### sources: [wikipedia <sub>1</sub>](https://en.wikipedia.org/wiki/Primitive_polynomial_(field_theory)#Pseudo-random_bit_generation),[wikipedia<sub>2</sub>](https://en.wikipedia.org/wiki/Linear-feedback_shift_register#Fibonacci_LFSRs)

## Primitiveness over GF(2<sup>n</sup>):

A primitive polynomial must **have a non-zero constant term**, for otherwise it will be divisible by x. Over GF(2), x + 1 is a primitive polynomial and all other primitive polynomials have an **odd number of terms**, since any polynomial mod 2 with an even number of terms is divisible by x + 1 (it has 1 as a root).

An **irreducible** polynomial F(x) of degree m over GF(p), where p is prime, is a primitive polynomial where the order is the smallest positive integer n such that F(x) divides xn − 1 is n = pm − 1.

**x<sup>e</sup> ≡ mod(f(x))** is e = 2<sup>n</sup> - 1

##### Sources: [wikipedia](https://en.m.wikipedia.org/wiki/Primitive_polynomial_(field_theory)#:~:text=An%20irreducible%20polynomial%20F(x,n%20%3D%20pm%20%E2%88%92%201.)), [math.stackexchange](https://math.stackexchange.com/questions/312186/understanding-primitive-polynomials-in-gf2), Primitive polynomial (field theory)

## Irreducibility over GF(p<sup>n</sup>):

Letting m be the maximum possible period, which is the size of the field, such that **x<sup>p.n</sup> - x divides f(x) mod (p)**
and **GCD(f(x),x<sup>p.(n/q)</sup> - x) mod(2) = 1** for each prime divisor q of n, then f(x) is irreducible over GF(p^n).


Otherwise, check every possible divisor in GF(2<sup>n</sup>), if none divide, then f(x) is irreducible over GF(2<sup>n</sup>)
1. p = x^(2^i), *for every i from 1 to degree/2 mod p(x) congruent to x
2. p2 = p^(2^degree) mod p(x) congruent to x

Other methods: Berlekamp's Algorithm
##### Sources: copilot, Rabin Test, [math.stackexchange](https://math.stackexchange.com/questions/1343450/how-can-i-prove-irreducibility-of-polynomial-over-a-finite-field), [wikipedia](https://en.m.wikipedia.org/wiki/Irreducible_polynomial#Over_the_integers_and_finite_fields)
