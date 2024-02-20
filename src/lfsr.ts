interface variables {
    seed?: number,
}

export class lfsr {
    private seed: number;

    constructor({seed}: variables) {
        if (seed) {
            this.seed = seed;
        } else {
            this.seed = (1 << 4) | 1
        }
    }

    next(): number {
        let newB = (this.seed ^ (this.seed >> 1)) & 1
        this.seed = (this.seed >> 1) | (newB << (4 - 1)) 
        return this.seed & 1
    }
}

const rand = new lfsr({})

console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
console.log(rand.next())
