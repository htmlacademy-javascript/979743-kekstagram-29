// логика работы эффектов в окне редактирования фотографии
const previewImg = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level'); //fieldset
const sliderElement = document.querySelector('.effect-level__slider'); //контейнер для вставки слайдера
const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');
const originalInput = document.querySelector('#effect-none');
const originalItem = document.querySelector('.effects__item:nth-child(1)');
const chromInput = document.querySelector('#effect-chrome');
const cromItem = document.querySelector('.effects__item:nth-child(2)');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1, // для эффекта хром пока
    connect: 'lower'
  });
  sliderElement.noUiSlider.on('update', (...rest) => {
    effectLevelInput.value = sliderElement.noUiSlider.get();
    console.log(effectLevelInput.value);
  });
};

const chooseOriginal = () => {
  previewImg.style.filter = 'none';
  effectLevelInput.value = 0;
  sliderContainer.classList.add('hidden');

};

// const chooseChrom = () =>{
//   sliderContainer.classList.remove('hidden');
//   previewImg.style.filter = 'grayscale(1)';
//   effectLevelInput.value = 1;
//   sliderElement.noUiSlider.updateOptions({
//     range: {
//       min: 0,
//       max: 1
//     },
//     start: 1,
//     step: 0.1
//   });

// };
const onEffectsChange = (evt) => {
  console.log(evt.target.value);
  };

const initEffects = () => {
  previewImg.style.filter = 'none';
  effectLevelInput.value = 0; //????
  createSlider();
  sliderContainer.classList.add('hidden');
  //прослушка на эффекты
};

const resetEffects = () =>{
  sliderElement.noUiSlider.destroy();
};


export {initEffects, resetEffects};
