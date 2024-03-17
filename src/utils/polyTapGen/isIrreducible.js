function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function isIrreducible(p, n) {
    var q = 2;  // We are in GF(2^n)

    // Check if p divides x^(q^n) - x
    if (Math.pow(q, n) % p !== 0) {
        return false;
    }

    // Check if p is coprime with x^(q^d) - x for all prime divisors d of n
    for (var d = 2; d <= n; d++) {
        if (n % d === 0 && gcd(p, Math.pow(q, d) - 1) !== 1) {
            return false;
        }
    }

    return true;
}

// console.log(isIrreducible([1,1,1,0],3))
console.log(isIrreducible(3,3))