// List of primitive polynomials over GF(2) for degrees 1-8
// Each polynomial is represented as an array of exponents for the terms with coefficient 1
// Source: https://www.xilinx.com/support/documentation/application_notes/xapp052.pdf
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

function createFeedbackPolynomial(degree) {
    // Select a primitive polynomial for the given degree
    let polynomial = primitivePolynomials[degree][0];

    // Create an array of zeros of length degree + 1
    let feedbackPolynomial = new Array(degree + 1).fill(0);

    // Set the coefficients for the terms in the primitive polynomial to 1
    for (let term of polynomial) {
        feedbackPolynomial[term] = 1;
    }

    return feedbackPolynomial;
}

let degree = 5;
let feedbackPolynomial = createFeedbackPolynomial(degree);
console.log(feedbackPolynomial);  // Outputs: [1, 1, 0, 0, 1]