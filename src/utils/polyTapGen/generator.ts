// 1. generate candidate polynomials of degree n in GF(2^n)
// 2. uneven taps, and x^0 present (constant term)
// 3. check if polynomial is primitive to GF
// 3.2 phi(n) = 2^n - 1, 
// 3.3 and no smaller will divide p(x)

// 4. check if polynomial is irredcubile
// 4.1 Euclidean Algorithm
// 5. found feedback tap register for degree n
import { dividePolynomials } from "./division";
const primitivePolynomials = {
    1: [[0, 1]],
    2: [[0, 2]],
    3: [[0, 1, 3]],
    4: [[0, 1, 4]],
    5: [[1, 2, 5]],
    6: [[0, 1, 6]],
    7: [[0, 1, 7]],
    8: [[1, 2, 3, 4, 8]]
};


/*
1.
GF(2^3) = {(x^3 + x + 1), (x^3 + x^2 + 1), (x^3 + x^2 + x + 1)}
x^7 / p(x)
3. (x^3 + x + 1), (x^3 + x^2 + 1) both divide x^7, have correct order

*/
// reducible polynomio: x^4+x^2+1 factors = (1 - x + x^2) (1 + x + x^2)


console.log(dividePolynomials([1, 0, 0, 0, 1],[1, 1, 0, 1]).remainder); // Logs [0, 0, 0, 1]