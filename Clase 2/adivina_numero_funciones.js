const rls = require('readline-sync');

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

module.exports = {guessNumber};
