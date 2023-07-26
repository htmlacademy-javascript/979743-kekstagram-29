// логика работы эффектов в окне редактирования фотографии
import { EFFECTS_STYLES } from './enums.js';

const previewImgElem = document.querySelector('.img-upload__preview img');
const sliderContainerElem = document.querySelector('.img-upload__effect-level'); //fieldset
const sliderElement = document.querySelector('.effect-level__slider'); //контейнер для вставки слайдера
const effectsListElem = document.querySelector('.effects__list');
const effectLevelInputElem = document.querySelector('.effect-level__value');

let choosenEffect = EFFECTS_STYLES.none;

const onEffectsChange = (evt) => {
  if (evt.target.value === 'none') {
    previewImgElem.style.filter = 'none';
    sliderContainerElem.classList.add('hidden');
    return;
  }
  sliderContainerElem.classList.remove('hidden');
  choosenEffect = EFFECTS_STYLES[evt.target.value];
  previewImgElem.style.filter = `${choosenEffect.style}(${choosenEffect.max}${choosenEffect.unit})`;
  //передаем данные для слайдера
  effectLevelInputElem.value = choosenEffect.max;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choosenEffect.min,
      max: choosenEffect.max,
    },
    start: choosenEffect.max,
    step: choosenEffect.step,
  });
};

const setPreviewImgStyle = () => {
  effectLevelInputElem.value = sliderElement.noUiSlider.get();
  previewImgElem.style.filter = `${choosenEffect.style}(${effectLevelInputElem.value}${choosenEffect.unit})`;
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    setPreviewImgStyle();
  });
};

const initEffects = () => {
  previewImgElem.style.filter = 'none';
  createSlider();
  sliderContainerElem.classList.add('hidden'); // при открытии окна выбран Оригнал, слайдера нет
  effectsListElem.addEventListener('change', onEffectsChange);
};

const resetEffects = () => {
  sliderElement.noUiSlider.destroy();
  previewImgElem.style.filter = 'none';
  choosenEffect = 'none';
};

export { initEffects, resetEffects };
