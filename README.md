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

## Irreducibility:

has all non-zero coefficients equal to 1. It cannot be factored into polynomials of lower degree with coefficients in ( GF(2) ), making it irreducible over ( GF(2) )

**or irreducible in GF(2^n)**

GCD(p,f) modulo 2 = 1 for
=> x^2^n-x
=> x^2^(n/q)-x for each prime divisor q of n

##### Source: copilot, [math.stackexchange](https://math.stackexchange.com/questions/1343450/how-can-i-prove-irreducibility-of-polynomial-over-a-finite-field)

factoring calculator
https://www.mathpapa.com/factoring-calculator/

A primitive polynomial must have a non-zero constant term, for otherwise it will be divisible by x. Over GF(2), x + 1 is a primitive polynomial and all other primitive polynomials have an odd number of terms, since any polynomial mod 2 with an even number of terms is divisible by x + 1 (it has 1 as a root).

## Primitive Polynomial (field theory): property 3. Irreducible
An irreducible polynomial F(x) of degree m over GF(p), where p is prime, is a primitive polynomial if the smallest positive integer n such that F(x) divides x^n − 1 is n = p^m − 1.

##### Source: Primitive polynomial (field theory). [wikipedia](https://en.m.wikipedia.org/wiki/Primitive_polynomial_(field_theory)#:~:text=An%20irreducible%20polynomial%20F(x,n%20%3D%20pm%20%E2%88%92%201.)

Order: The order of a polynomial is the smallest positive integer n such that the polynomial divides x^n - 1. For a polynomial to be primitive, n must be the maximum possible period, which is the size of the field minus 1 (for GF(2^n), this would be 2^n - 1). source copilot

- generate irreducible polynomial degree n (n = bit count)
- check if primitive
- primitive => to taps

### Irreducibility - **Rabin Test**
### Irreducibility - **Berlekamp's Algorithm**



### Rabin Test

Probabilistic algorithm, determines if apolynomial is irreducible over a finite field. Probability ... (high)

1. p = x^(2^i), *for every i from 1 to degree - 1* mod p(x) congruent to x
2. p2 = p^(2^degree) mod p(x) congruent to x
p2 = x => irreducible over GF(2^degree)