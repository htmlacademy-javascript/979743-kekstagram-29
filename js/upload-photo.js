// окно загрузки фото; валидация; ее возм, потом в отдельный модуль
import { MAX_HASHTAG_COUNT, ErrorText, VALID_SYMBOLS } from './enums.js';
import { toggleBodyForPopup, normalizeTags } from './util.js';
import { onCloseClick, onEscDown } from './on-upload-click.js';
import { addListenerScaleBtns } from './scale-photo.js';

const uploadForm = document.querySelector('#upload-select-image');
const editImgForm = document.querySelector('.img-upload__overlay');
const editImgCloseBtn = editImgForm.querySelector('.img-upload__cancel');
const editImgComment = editImgForm.querySelector('.text__description');
const editImgTags = editImgForm.querySelector('.text__hashtags');
const submitBtn = editImgForm.querySelector('#upload-submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
const hasValidTagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(editImgTags, hasValidTagsCount, ErrorText.INVALID_COUNT, 3, true);

pristine.addValidator(editImgTags, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

pristine.addValidator(editImgTags, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);

//блокируем кнопку отправки формы при наличии ошибки. Pristine это очему-то не делает
const disableSubmit = () => {
  if (pristine.validate()) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', 'disabled');
  }
};
editImgComment.addEventListener('input', disableSubmit);
editImgTags.addEventListener('input', disableSubmit);

const openEditImg = () => {
  // логика открытия окна редактирования фото
  addListenerScaleBtns();
};

const closeEditImg = () => {
  uploadForm.reset();
  pristine.reset();
  // сбросить значения эффектов
  // сбросить значения масштаба, удалить обработчики кнопок масштабирования
  editImgForm.classList.add('hidden');
  toggleBodyForPopup();
  editImgCloseBtn.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscDown);
};

export { openEditImg, closeEditImg };
