const numbers: number[] = [2, 4, 8, 16, 32]; //input numbers for calculations
const output: number = 11; //result of the operations using the numbers above
const len: number = numbers.length - 1; //max operations possible

type resultobj = {
    perm: number[];
    ops: number[];
    opsDone: number;
};

//Function that makes all the permutations for the 5 numbers (120 in total)
function permutations(permutation: number[]): number[][] {
    let length: number = permutation.length;
    let result = [permutation.slice()];
    let c: number[] = Array<number>(length).fill(0);
    let i: number = 1, k: number, p: number;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

//Function that gets all possible operations (256 in total)
function operations(): number[][] {
    let operations = Array<number>(len).fill(0);
    let totalOperations: number[][] = [];
    while (true) {
        for (let i = len - 1; i > 0; i--) {
            if (operations[i] === 4) {
                operations[i] = 0;
                operations[i - 1]++;
            }
        }
        if (operations[0] === 4)
            return totalOperations;
        totalOperations.push(operations.slice());
        operations[len - 1]++;
    }
}

//Function that makes an object with all posible combinations that give the given output(11 default)
function getEleven(permutations: number[][], totalOperations: number[][]): resultobj[] {
    let validCombinations: resultobj[] = [];
    totalOperations.forEach((op) => {
        permutations.forEach((per) => {
            let cur = per[0];
            for (let i = 0; i < len; i++) {
                if (op[i] === 0)
                    cur += per[i + 1];
                else if (op[i] === 1)
                    cur -= per[i + 1];
                else if (op[i] === 2)
                    cur *= per[i + 1];
                else if (op[i] === 3)
                    cur /= per[i + 1];
                if (cur === output) {
                    validCombinations.push({perm: per, ops: op, opsDone: i + 1});
                    break;
                }
            }
        });
    });
    return validCombinations;
}

//Helper function that just prints it out in a readable way.
function printCombination(combination: resultobj): void {
    let print: string = '';
    print += combination.perm[0];
    combination.ops.forEach((value, index) => {
        switch (value) {
            case 0:
                print += ' + ';
                break;
            case 1:
                print += ' - ';
                break;
            case 2:
                print += ' * ';
                break;
            case 3:
                print += ' / ';
                break;
        }
        print += combination.perm[index + 1];
    });
    console.log(print);
}

let result = getEleven(permutations(numbers), operations());
console.log("total combinations where result is ", output, ": ", result.length);
console.log("operations are done from left to right (so not pemdas): ");
result.forEach(printCombination);