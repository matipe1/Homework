const aleatory_num = Math.trunc(Math.random() * 100 + 1);
// console.log(aleatory_num)

const {guessNumber} = require('./adivina_numero_funciones.js');

console.log(guessNumber(aleatory_num));