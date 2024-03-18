"use strict";
// test
const rsa = ({ p, q }) => {
    // Public
    const n = p * q;
    let e = 0;
    // Find e
    let coprime = false;
    while (!coprime) {
        let rand = Math.floor(Math.random() * n - 1) + 1;
        // let rand = 3
        let a = gcd({ a: rand, b: (p - 1) * (q - 1) });
        if (a == 1) {
            coprime = true;
            e = rand;
        }
    }
    // ret
    console.log(`for p: ${p}, q: ${q}`);
    return { n, e };
};
const gcd = ({ a, b }) => {
    if (!b) {
        return a;
    }
    return gcd({ a: b, b: a % b });
};
const encrypt = ({ m, n, e }) => {
    return powerMod(m, e, n);
};
const decrypt = ({ m, p, q, e }) => {
    let d = dFind(p, q, e);
    return powerMod(m, d, p * q);
};
// TO VE IMPROVED
const dFind = (p, q, e) => {
    let modulus = (p - 1) * (q - 1);
    let i = 0;
    while (true) {
        if (Number.isInteger((modulus * i + 1) / e)) {
            return ((modulus * i + 1) / e);
        }
        i++;
    }
};
// let RSAprivate = {p: 5622, q: 6}
let RSAprivate = { p: 5, q: 11 };
let RSApublic = rsa(RSAprivate);
console.log(gcd({ a: 5622, b: 6 }));
console.log(rsa({ p: 5, q: 11 }));
console.log(RSApublic);
let mes = encrypt(Object.assign({ m: 54 }, RSApublic));
console.log(decrypt(Object.assign(Object.assign({ m: mes }, RSAprivate), RSApublic)));
// power
function powerMod(base, exponent, modulus) {
    if (modulus === 1)
        return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}
//# sourceMappingURL=rsa.js.map