export const millsConstant = 1.3063778838630806904686144926;
export const primeNth = (n: number) => {
    return Math.round(millsConstant ** Math.pow(3, n));
}