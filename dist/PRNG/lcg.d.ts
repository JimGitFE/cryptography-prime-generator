interface variables {
    seed?: number;
    a: number;
    c?: number;
    m: number;
}
export declare class lcg {
    private seed;
    private a;
    private c;
    private m;
    constructor({ seed, a, c, m }: variables);
    next(): number;
}
export {};
//# sourceMappingURL=lcg.d.ts.map