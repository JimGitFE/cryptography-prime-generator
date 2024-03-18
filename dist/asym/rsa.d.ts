interface GCDparams {
    a: number;
    b: number;
}
interface RSAparams {
    p: number;
    q: number;
}
interface RSAvals {
    n: number;
    e: number;
}
interface encryptParams extends RSAvals {
    m: number;
}
interface decryptParams extends encryptParams, RSAparams {
}
declare const rsa: ({ p, q }: RSAparams) => RSAvals;
declare const gcd: ({ a, b }: GCDparams) => number;
declare const encrypt: ({ m, n, e }: encryptParams) => number;
declare const decrypt: ({ m, p, q, e }: decryptParams) => number;
declare const dFind: (p: number, q: number, e: number) => number;
declare let RSAprivate: {
    p: number;
    q: number;
};
declare let RSApublic: RSAvals;
declare let mes: number;
declare function powerMod(base: number, exponent: number, modulus: number): number;
//# sourceMappingURL=rsa.d.ts.map