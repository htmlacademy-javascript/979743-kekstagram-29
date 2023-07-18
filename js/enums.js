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
};
