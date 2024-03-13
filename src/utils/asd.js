
const polySum = (arr1, arr2) => {
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

const customSign = (num) => num === 0 ? -1 : Math.sign(num)

// abs sum keeping first variable sign ex absoluteSum(-5, 2) => -7
function absoluteOperation(a, b, operation = "sum") {
    switch (operation) {
        case "sum":
            return customSign(a)*(Math.abs(a) + Math.abs(b));
        case "sub":
            return customSign(a)*(Math.abs(a) - Math.abs(b));
        case "mul":
            return customSign(a)*(Math.abs(a) * Math.abs(b));
        case "dif":
            return Math.abs(a) > Math.abs(b);
    }
}

const polyString = (polynomial) => {
    let poly = {}
    let str = ""
    polynomial.forEach(num=>{
        poly[num] > 0? poly[num] += 1 : poly[num] = 1
    })
    Object.entries(poly).sort((a,b)=>Math.abs(Number(a[0]))-Math.abs(Number(b[0]))).reverse().forEach(([key, value]) => {
        const sign = Math.sign(Number(key))>0?"+":"-"
        const coef = value==1?"":value
        const power = Number(key) === 0 ? "" : `x^${Math.abs(Number(key))}`;
        str += `${sign}${coef}${power}`
    })
    return str.slice(1)
}

const divide = (dividend, divisor) => {
    let [remainder, quotient, endLoop, i] = [[], [], false, 0]
    while (true) {
        remainder = []
        // dividend sort by absolute value => [15, -9, 6]
        dividend.sort((a, b) => Math.abs(b) - Math.abs(a));

        // 1. generate new quotient => sign(-1|1)*(newDividend-divisor[0])
        quotient.push(absoluteOperation(dividend[0], divisor[0], "sub"))

        if (absoluteOperation(quotient[i],quotient[i-1], "dif")) {
            quotient.pop()
            break
        }

        // 2. new quotient sum each term => 11 + divisor
        divisor.forEach(div => {
            let newNum = -absoluteOperation(quotient[i], div, "sum")
            remainder = polySum([...remainder], [newNum])
        });

        // 3. remainder => dividend at next iteration
        dividend = polySum(dividend, remainder)
        i+=1
    }
    return {quotient, "remainder": dividend}
}

console.log(polyString(divide([15], [4,3,0]).quotient))
console.log(polyString(divide([15], [4,3,0]).remainder))
 