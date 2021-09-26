// Получение случайного целого числа в заданном интервале
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

getRandomInt(1, 10);

// Проверка работоспособности:
// console.log(getRandomInt(1, 10));

const getStringLength = (stringValue, stringMaxLength) => stringValue.length < stringMaxLength;

getStringLength('Hello world', 20);

// Алтернативное написание:
// function getStringLength(stringValue, stringMaxLength) {
//   return stringValue.length < stringMaxLength;
// }

// Проверка работоспособности:
// console.log(getStringLength('Hello world', 20));


