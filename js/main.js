const GENERATED_ITEMS_COUNT = 25;
const LIKES_MIN_VALUE = 15;
const LIKES_MAX_VALUE = 200;
const MAX_GENERATED_COMMENTS_COUNT = 5;
const AVATARS_LENGTH = 6;

const COMMENT_NAMES = [
  'Петер Саган',
  'Крис Фрум',
  'Жюлиан Алафилипп',
  'Матье ван дер Пул',
  'Тадей Погачар',
  'Примож Роглич ',
  'Марк Саймон Кавендиш',
  'Эган Арлей Берналь Гомес',
];

const PHOTO_DESCRIPTIONS = [
  'Профессиональный словацкий шоссейный велогонщик, выступающий за команду мирового тура «Bora–Hansgrohe.',
  'Четырёхкратный победитель Тур де Франс (2013, 2015, 2016, 2017',
  'Французский профессиональный шоссейный велогонщик, выступающий за бельгийскую команду мирового тура «Deceuninck-Quick Step»',
  'Чемпион мира (2015), чемпион Европы (2017), четырёхкратный чемпион Нидерландов (2015, 2016, 2017, 2018) по велокроссу',
  'Двукратный победитель генеральной классификации Тур де Франс в 2020 и 2021 годах.',
  'Чемпион Словении 2016 года в индивидуальной гонке. Серебряный призёр чемпионата мира 2017 года в индивидуальной гонке. Олимпийский чемпион 2020 года в индивидуальной гонке.',
  'Один из самых быстрых велосипедистов в мире.',
  'Колумбийский профессиональный шоссейный велогонщик, выступающий c 2018 года за команду мирового тура «Ineos Grenadiers». Чемпион Колумбии 2018 года в индивидуальной гонке.',
];

const COMMENT_MESSAGE = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

const commentMessageArray = COMMENT_MESSAGE.replace(/([.?!])\s*(?=[А-Я])/g, '$1|').split('|');

const checkStringLength = (stringValue, stringMaxLength) => stringValue.length < stringMaxLength;
checkStringLength('Hello world', 20);

// Получение случайного целого числа в заданном интервале, включительно
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function getUniqueRandomNumbersArray(maxStorageSize) {
  const randomNumbersStorage = [];
  const firstRandomNumber = getRandomIntInclusive(1, maxStorageSize);
  randomNumbersStorage.push(firstRandomNumber);
  while (randomNumbersStorage.length < maxStorageSize) {
    const randomNumber = getRandomIntInclusive(1, maxStorageSize);
    if (randomNumbersStorage.includes(randomNumber)) {
      getRandomIntInclusive(1, maxStorageSize);
    } else {
      randomNumbersStorage.push(randomNumber);
    }
  }
  return randomNumbersStorage;
};

const maxCommentsCount = GENERATED_ITEMS_COUNT * MAX_GENERATED_COMMENTS_COUNT;

const postIdArray = getUniqueRandomNumbersArray(GENERATED_ITEMS_COUNT);
const postPhotoNumberArray = getUniqueRandomNumbersArray(GENERATED_ITEMS_COUNT);
const commentIdArray = getUniqueRandomNumbersArray(maxCommentsCount);

function getValueFromArray(array) {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  const randomNumber = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomNumber;
}

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

function generateComment() {
  return {
    id: getValueFromArray(commentIdArray),
    avatar: `img/avatar/-${getRandomIntInclusive(1, AVATARS_LENGTH)}.svg`,
    message: `${getRandomArrayElement(commentMessageArray)} ${getRandomArrayElement(commentMessageArray)}`,
    name: getRandomArrayElement(COMMENT_NAMES),
  };
}

function generateObject() {
  return {
    id: getValueFromArray(postIdArray),
    url: `photos/${getValueFromArray(postPhotoNumberArray)}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomIntInclusive(LIKES_MIN_VALUE, LIKES_MAX_VALUE),
    comments: Array.from({
      length: getRandomIntInclusive(1, MAX_GENERATED_COMMENTS_COUNT),
    }, generateComment),
  };
}

const items = Array.from({
  length: GENERATED_ITEMS_COUNT,
}, generateObject);
console.log(items);