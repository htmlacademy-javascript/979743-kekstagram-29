// вешает обработчики на + и - для масштаба фото; манипулирует стилями для изменения масштаба
import { SCALE } from './enums.js';

const scaleIncrease = document.querySelector('.scale__control--bigger');
const scaleDecrease = document.querySelector('.scale__control--smaller');
const scaleInput = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');


const scalePhoto = (value) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onIncreaseClick = () => {
  scalePhoto(Math.min(parseInt(scaleInput.value, 10) + SCALE.step, SCALE.max));
};

const onDecreaseClick = () => {
  scalePhoto(Math.max(parseInt(scaleInput.value, 10) - SCALE.step, SCALE.min));
};

const initScale = () => {
  scaleIncrease.addEventListener('click', onIncreaseClick);
  scaleDecrease.addEventListener('click', onDecreaseClick);
  photoPreview.style.transform = 'scale(1)';
};

const resetScale = () => {
  scalePhoto(SCALE.startValue);
  scaleIncrease.removeEventListener('click', onIncreaseClick);
  scaleDecrease.removeEventListener('click', onDecreaseClick);
};

export {initScale, resetScale};
