// логика работы эффектов в окне редактирования фотографии
import { EFFECTS_STYLES } from './enums.js';

const previewImg = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level'); //fieldset
const sliderElement = document.querySelector('.effect-level__slider'); //контейнер для вставки слайдера
const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');

let choosenEffect = EFFECTS_STYLES.none;

const onEffectsChange = (evt) => {
  if (evt.target.value === 'none') {
    previewImg.style.filter = 'none';
    sliderContainer.classList.add('hidden');
    return;
  }
  sliderContainer.classList.remove('hidden');
  choosenEffect = EFFECTS_STYLES[evt.target.value];
  previewImg.style.filter = `${choosenEffect.style}(${choosenEffect.max}${choosenEffect.unit})`;
  //передаем данные для слайдера
  effectLevelInput.value = choosenEffect.max;
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
  effectLevelInput.value = sliderElement.noUiSlider.get();
  previewImg.style.filter = `${choosenEffect.style}(${effectLevelInput.value}${choosenEffect.unit})`;
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
  previewImg.style.filter = 'none';
  createSlider();
  sliderContainer.classList.add('hidden'); // при открытии окна выбран Оригнал, слайдера нет
  effectsList.addEventListener('change', onEffectsChange);
};

const resetEffects = () => {
  sliderElement.noUiSlider.destroy();
  previewImg.style.filter = 'none';
  choosenEffect = 'none';
};

export { initEffects, resetEffects };
