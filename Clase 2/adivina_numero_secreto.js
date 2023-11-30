const rls = require('readline-sync');

const aleatory_num = Math.trunc(Math.random() * 100 + 1);
// console.log(aleatory_num)

function guessNumber(num) {
    let guess;
    while (Number(guess) !== num) {
        guess = rls.question('What number do you think it is? ');

        if (Number(guess) !== num) {
            if (Number(guess) < num) {
                console.log('The number is below the aleatory number');
            }
            else {
                console.log('The number is above the aleatory number');
            };
        };
    };
    return `You're right! The number is ${guess}`
};

console.log(guessNumber(aleatory_num));
