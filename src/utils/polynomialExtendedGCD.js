function polynomialExtendedGCD(poly1, poly2) {
    // Assuming poly1 and poly2 are arrays representing coefficients of the polynomials
    // For example, poly1 = [a, b, c] represents ax^2 + bx + c

    // Initialize coefficients for the linear combination
    let s = [1, 0];
    let t = [0, 1];

    while (poly2.length > 0) {
        const quotient = [];
        const remainder = [];

        // Perform polynomial division: poly1 = quotient * poly2 + remainder
        for (let i = 0; i < poly1.length; i++) {
            const q = Math.floor(poly1[i] / poly2[0]);
            quotient.push(q);
            remainder.push(poly1[i] - q * poly2[0]);
        }

        // Update coefficients for the linear combination
        const newS = s.map((si, i) => si - quotient[i] * t[i]);
        const newT = t.map((ti, i) => ti - quotient[i] * s[i]);

        // Update poly1 and poly2 for the next iteration
        poly1 = poly2;
        poly2 = remainder;
        s = newS;
        t = newT;
    }

    // The GCD is the last non-zero element in poly1
    const gcd = poly1[poly1.length - 1];

    // Return the GCD and coefficients for the linear combination
    return { gcd, s, t };
}

// Example usage:
const poly1 = [2, 3, 1]; // Represents 2x^2 + 3x + 1
const poly2 = [1, 1];    // Represents x + 1

const result = polynomialExtendedGCD(poly1, poly2);
console.log("Extended GCD:", result.gcd);
console.log("Coefficients s:", result.s);
console.log("Coefficients t:", result.t);