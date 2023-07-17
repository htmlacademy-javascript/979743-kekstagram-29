// логика работы эффектов в окне редактирования фотографии
const previewImg = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level'); //fieldset
const sliderElement = document.querySelector('.effect-level__slider'); //контейнер для вставки слайдера
const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');

const setPreviewImgStyle = (value) {
  // устанавливает стиль для превьюхи по chosenEffects и положению ползунка
};

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
    setPreviewImgStyle(effectLevelInput.value);
    console.log(effectLevelInput.value);
  });
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
const effectsStyles = {
  crome: {
    style: 'grayscale',
    unit: ''
  },
  sepia: {
    style: 'sepia',
    unit: ''
  },
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};
const onEffectsChange = (evt) => {
  sliderContainer.classList.remove('hidden');
  // сохранить стиль в глоб переменную chosenEffect

  // console.log(evt.target.value);
  const evtTargetValue = evt.target.value;
  console.log('style is ', effectsStyles.crome);
  console.log('style is ', effectsStyles['chrome']);



  // previewImg.style.filter = `${evtTargetValue}(1)`;
  };

const initEffects = () => {
  previewImg.style.filter = 'none';
  effectLevelInput.value = 0; //????
  createSlider();
  sliderContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectsChange);
};

const resetEffects = () =>{
  sliderElement.noUiSlider.destroy();
  previewImg.style.filter = 'none';
};


export {initEffects, resetEffects};
