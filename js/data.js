//манипуляции с данными. Возвращает данные для отрисовки. Потом его заменит модуль загрузки данных с сервера
import {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator,
} from './util.js';
import {
  PHOTOS_COUNT,
  LIKES_COUNT,
  COMMENTS_COUNT,
  AVATAR_NUMBER,
} from './enums.js';

import { descriptions, messages, authorsNames } from './mocks.js';

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
// возвращаем 1 объект фото
const createPhoto = (photoId) => ({
  id: photoId, // число от 1 до 25
  url: getPhotoFileName(photoId), // имя файла совпадает с id
  description: getRandomArrayElement(descriptions), // случайный элемент из массива descriptions
  likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max), // случайное число от 15 до 200
  comments: Array.from(
    { length: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max) },
    uploadComment
  ),
});

const createAllPhotosData = () =>
  //потом переименовать в uploadAllPhotosData
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

export { createAllPhotosData };
