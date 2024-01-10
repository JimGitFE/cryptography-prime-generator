export const lcg = (seed: number, a: number, c: number, m: number) => {
    return (a * seed + c) % m
}