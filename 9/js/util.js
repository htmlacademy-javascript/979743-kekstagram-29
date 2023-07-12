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

const toggleBodyForPopup = () => body.classList.toggle('modal-open');

export { getRandomInteger, getRandomArrayElement, createIdGenerator, isEsc, toggleBodyForPopup };
