// вспомогательные функции

const body = document.querySelector('body');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const isEsc = (evt) => evt.key === 'Escape';
//переключатель класса для body при открытии модальных окон
const toggleBodyForPopup = () => body.classList.toggle('modal-open');

//нормализатор строк
const normalizeTags = (tagStr) =>
  tagStr
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

export { getRandomInteger, getRandomArrayElement, createIdGenerator, isEsc, toggleBodyForPopup, normalizeTags };
