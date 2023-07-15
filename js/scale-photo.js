// вешает обработчики на + и - для масштаба фото; манипулирует стилями для изменения масштаба
import { SCALE } from './enums.js';

const scaleIncrease = document.querySelector('.scale__control--bigger');
const scaleDecrease = document.querySelector('.scale__control--smaller');
const scaleInput = document.querySelector('.scale__control--value');
const uploadingPhoto = document.querySelector('.img-upload__preview img');


const scalePhoto = (value) => {
  uploadingPhoto.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onIncreaseClick = () => {
  scalePhoto(Math.min(parseInt(scaleInput.value, 10) + SCALE.step, SCALE.max));
};

const onDecreaseClick = () => {
  scalePhoto(Math.max(parseInt(scaleInput.value, 10) - SCALE.step, SCALE.min));
};

const addListenerScaleBtns = () => {
  scaleIncrease.addEventListener('click', onIncreaseClick);
  scaleDecrease.addEventListener('click', onDecreaseClick);
};

export {addListenerScaleBtns};
