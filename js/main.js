// Константы из ТЗ
const PHOTOS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 30;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

// моки
const descriptions = [
  'ежик в тумане',
  'черное море, белый мерседес',
  'еще какое-нибудь описание',
  'надо придумать что-нибудь еще',
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

// массивы для проверки на уникальность идентификаторов
// ничего лучше, чем через глобальную переменую, я не придумала

// вспомогательные функции
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function uploadComment() {
  // как-бы подгружаем с сервера 1 комментарий
  return (photoComment = {
    id: getRandomInteger(1, 1000), //макс значение как определить + проверка на уникальность
    avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_NUMBER)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(authorsNames),
  });
}

// основная функция
function createPhoto() {
  // сохраним данные в константах
  const photoId = getRandomInteger(1, PHOTOS_COUNT);
  const photoUrl = `photos/${photoId}.jpg`;
  const photoDescription = getRandomArrayElement(descriptions);
  const photoLikes = getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  const photoComments = Array.from(
    { length: getRandomInteger(0, MAX_COMMENTS_COUNT) },
    uploadComment
  ); // размножаем коммнтарии к фото

  // возвращаем 1 объект фото
  return (photo = {
    id: photoId, // число от 1 до 25 + проверка на уникальность
    url: photoUrl, // имя файла совпадает с id + придумать, как получить доступ к другому свойству объекта
    description: photoDescription, // случайный элемент из массива descriptions
    likes: photoLikes, // случайное число от 15 до 200
    comments: photoComments,
  });
}

const allPhotos = Array.from({ length: 5 }, createPhoto);
console.log(allPhotos);
