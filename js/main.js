// Константы из ТЗ
const PHOTOS_COUNT = 25;
const LIKES_COUNT = {
  min: 15,
  max: 200,
};
const COMMENTS_COUNT = {
  min: 0,
  max: 30,
};

const AVATAR_NUMBER = {
  min: 1,
  max: 6,
};

// моки
const descriptions = [
  'ежик в тумане',
  'черное море, белый мерседес',
  'еще какое-нибудь описание',
  'надо придумать что-нибудь еще',
  'белка на айсберге',
  'чебурашка и крокодил Гена',
  'кот Леопольд',
  'Чертенок №13',
  'домовенок Кузя',
  'фантазия кончилась',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const authorsNames = ['Ваня', 'Аня', 'Петя', 'Коля', 'Маша', 'Катя', 'Саша'];

// вспомогательные функции
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator(); // запускаем генератор id для комментов, нумерация сквозная

const uploadComment = () => {
  // создаем 1 комментарий, id по порядку
  const commentId = generateCommentId();
  const newmessage = Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(messages)
  );
  // исключаем повторы предложений, если их два
  if (newmessage.length === 2 && newmessage[0] === newmessage[1]) {
    while (newmessage[0] === newmessage[1]) {
      newmessage[1] = getRandomArrayElement(messages);
    }
  }

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(
      AVATAR_NUMBER.min,
      AVATAR_NUMBER.max
    )}.svg`,
    message: newmessage.join(' '),
    name: getRandomArrayElement(authorsNames),
  };
};
const getPhotoFileName = (id) => `photos/${id}.jpg`;
// основная функция - создаем 1 объект фото
const createPhoto = (photoId) =>
  // возвращаем 1 объект фото
  ({
    id: photoId, // число от 1 до 25
    url: getPhotoFileName(photoId), // имя файла совпадает с id
    description: getRandomArrayElement(descriptions), // случайный элемент из массива descriptions
    likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max), // случайное число от 15 до 200
    comments: Array.from(
      { length: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max) },
      uploadComment
    ),
  });

const createAllPhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

createAllPhotos();
//console.log(createAllPhotos());
