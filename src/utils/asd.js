
function polySum(arr1, arr2) {
    let newarr = []
    arr1.forEach(num => {
            let [inPos, inNeg] = [arr2.indexOf(num), arr2.indexOf(-num)];
            if (inNeg !== -1 && num !== 0) {
                // remove from arr2 and filter from arr1
                arr2.splice(inNeg, 1);
                return false;
            } else if (inPos !== -1) {
                // add to arr1 and remove from arr2
                arr2.splice(inPos, 1);
                newarr.push(num);
            }
            newarr.push(num);
    });
    return [...newarr, ...arr2];
}

// abs sum keeping first variable sign ex absoluteSum(-5, 2) => -7
function absoluteOperation(a, b, operation = "sum") {
    switch (operation) {
        case "sum":
            return Math.sign(a)*(Math.abs(a) + Math.abs(b));
        case "sub":
            return Math.sign(a)*(Math.abs(a) - Math.abs(b));
        case "mul":
            return Math.sign(a)*(Math.abs(a) * Math.abs(b));
    }
}

function divide (dividend, divisor)  {
    let quotient = []
    let remainder = []
    for (let i = 0; i < 19; i++) {
        remainder = []
        // dividend sort by absolute value => [15, -9, 6]
        dividend.sort((a, b) => Math.abs(b) - Math.abs(a));

        // 1. generate new quotient => sign(-1|1)*(newDividend-divisor[0])
        quotient.push(absoluteOperation(dividend[0], divisor[0], "sub"))
        console.log("at quotient =",quotient[i])

        // 2. new quotient times each term => 11 + divisor
        divisor.forEach(div => {
            let newNum = -absoluteOperation(quotient[i], div, "sum")
            remainder = polySum([...remainder], [newNum])
        });
        // remainder
        dividend = polySum(dividend, remainder)
        console.log(dividend)
        // console.log(`asd1${i}`,remainder, dividend, quotient)
    }

}

// let arr1 = [-15, -15,3,4,5,0, 3, 3];
// let arr2 = [-15,-3,-3, -3,0, 9];
let arr1 = [];
let arr2 = [-15,-3,-3, -3,0, 9];
// console.log("asd",polySum(arr1, arr2));  // Output: [-15, -15, -15, 4, 5, 0, 0, 9]

divide([15], [4,3,0])
 