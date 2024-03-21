// const modpow = ()

// const gcd


export const compareArrays = (a: any[], b: any[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

export function isPrime(num: number) {
    for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

// Modulo Operation
export const mod = function (num: number, modulo: number):number {
    if (modulo === 0) return num
    return ((num % modulo) + modulo) % modulo;
  };