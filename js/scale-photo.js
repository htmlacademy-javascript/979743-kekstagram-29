// вешает обработчики на + и - для масштаба фото; манипулирует стилями для изменения масштаба

import { SCALE } from './enums.js';

const scaleIncreaseElem = document.querySelector('.scale__control--bigger');
const scaleDecreaseElem = document.querySelector('.scale__control--smaller');
const scaleInputElem = document.querySelector('.scale__control--value');
const photoPreviewElem = document.querySelector('.img-upload__preview img');

const scalePhoto = (value) => {
  photoPreviewElem.style.transform = `scale(${value / 100})`;
  scaleInputElem.value = `${value}%`;
};

const onIncreaseClick = () => {
  scalePhoto(Math.min(parseInt(scaleInputElem.value, 10) + SCALE.step, SCALE.max));
};

const onDecreaseClick = () => {
  scalePhoto(Math.max(parseInt(scaleInputElem.value, 10) - SCALE.step, SCALE.min));
};

const initScale = () => {
  scaleIncreaseElem.addEventListener('click', onIncreaseClick);
  scaleDecreaseElem.addEventListener('click', onDecreaseClick);
  photoPreviewElem.style.transform = 'scale(1)';
};

const resetScale = () => {
  scalePhoto(SCALE.startValue);
  scaleIncreaseElem.removeEventListener('click', onIncreaseClick);
  scaleDecreaseElem.removeEventListener('click', onDecreaseClick);
};

export { initScale, resetScale };
