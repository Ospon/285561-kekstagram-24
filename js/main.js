// Получение случайного целого числа в заданном интервале, включительно
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
getRandomIntInclusive(1, 10);

const checkStringLength = (stringValue, stringMaxLength) => stringValue.length < stringMaxLength;
checkStringLength('Hello world', 20);

const commentNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const photoDescriptions = [
  'Description-1',
  'Description-2',
  'Description-3',
  'Description-4',
  'Description-5',
  'Description-6',
];

const generatedItemsCount = 25;
const likesMin = 15;
const likesMax = 250;

const getUniqueRandomNumbersArray = function () {
  const randomNumbersStorage = [];
  const firstRandomNumber = getRandomIntInclusive(1, generatedItemsCount);
  randomNumbersStorage.push(firstRandomNumber);
  while (randomNumbersStorage.length < generatedItemsCount) {
    const randomNumber = getRandomIntInclusive(1, generatedItemsCount)
    if (randomNumbersStorage.includes(randomNumber)) {
      getRandomIntInclusive(1, generatedItemsCount);
    } else {
      randomNumbersStorage.push(randomNumber);
    }
  }
  return randomNumbersStorage;
};

const itemsIdArray = getUniqueRandomNumbersArray();
const itemsPhotoNumberArray = getUniqueRandomNumbersArray();
const commentIdArray = getUniqueRandomNumbersArray();

const giveArrayNumber = function (array) {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  const randomNumber = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomNumber;
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];


const generateComment = function () {
  return {
    id: giveArrayNumber(commentIdArray),
    avatar: 'img/avatar/-' + getRandomIntInclusive(1, generatedItemsCount) + '.svg',
    message: 'Generated',
    name: getRandomArrayElement(commentNames),
  };
};

const generateObject = function () {
  return {
    id: giveArrayNumber(itemsIdArray),
    url: 'photos/' + giveArrayNumber(itemsPhotoNumberArray) + '.jpg',
    description: getRandomArrayElement(photoDescriptions),
    likes: getRandomIntInclusive(likesMin, likesMax),
    comments: generateComment(),
  };
};

const items = Array.from({
  length: generatedItemsCount
}, generateObject);
console.log(items);
