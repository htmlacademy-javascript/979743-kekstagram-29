// модуль содержит константы проекта, из ТЗ, например
const PHOTOS_COUNT = 25;
const LIKES_COUNT = {
  min: 15,
  max: 200,
};
const COMMENTS_COUNT = {
  min: 0,
  max: 30,
};

const AVATAR_NUMBER = {
  min: 1,
  max: 6,
};
const COMMENTS_PORTION = 5;

const MAX_HASHTAG_COUNT = 5;

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COUNT: `Количество хэштегов не может быть больше ${MAX_HASHTAG_COUNT}`,
  INVALID_PATTERN: 'Хэштег не соответствует правилам',
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  GET_DATA: 'Нам очень жаль, но мы не можем сейчас показать Вам фотографии. Мы обязательно скоро все починим',
  SEND_DATA: 'Нам очень жаль, но мы не можем сейчас загрузить Вашу фотографию. Мы обязательно скоро все починим',
};

const SCALE = {
  startValue: 100,
  step: 25,
  max: 100,
  min: 25,
};

const EFFECTS_STYLES = {
  chrome: {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
  none: {
    style: 'none',
    unit: '',
    min: 0,
    max: 0,
    step: 0,
  },
};

const Url = {
  GET_DATA: 'https://29.javascript.pages.academy/kekstagram/data',
  SEND_DATA: 'https://29.javascript.pages.academy/kekstagram',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуем...',
};

const COUNT_RANDOM_THUMBNAILS = 10;

const DEBOUNCE_DELAY = 500;

export {
  PHOTOS_COUNT,
  LIKES_COUNT,
  COMMENTS_COUNT,
  AVATAR_NUMBER,
  COMMENTS_PORTION,
  MAX_HASHTAG_COUNT,
  ErrorText,
  VALID_SYMBOLS,
  SCALE,
  EFFECTS_STYLES,
  Url,
  Method,
  SubmitButtonText,
  COUNT_RANDOM_THUMBNAILS,
  DEBOUNCE_DELAY,
};
