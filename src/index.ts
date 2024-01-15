import { lcg } from './lcg'
import { miller_rabin } from './miller_rabin'
const millsConstant = 1.3063778838630806904686144926

export const primeNth = (n: number): number => {
    return Math.round(millsConstant ** Math.pow(3, n))
}

console.log(primeNth(4), "prime 4")


export { lcg, millsConstant, miller_rabin }