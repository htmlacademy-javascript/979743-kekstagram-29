// валидация комментариев и хэш-тегов
// потом дописать отдельную валидацию для каждого вида ошибки, чтоб было соотв сообщение пользователю
import { MAX_HASHTAG_COUNT, ErrorText, VALID_SYMBOLS } from './enums.js';
import { normalizeTags } from './util.js';

const uploadFormElem = document.querySelector('#upload-select-image');
const editImgFormElem = document.querySelector('.img-upload__overlay');
const editImgCommentElem = editImgFormElem.querySelector('.text__description');
const editImgTagsElem = editImgFormElem.querySelector('.text__hashtags');
const submitBtnElem = editImgFormElem.querySelector('#upload-submit');

const pristine = new Pristine(uploadFormElem, {
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

pristine.addValidator(editImgTagsElem, hasValidTagsCount, ErrorText.INVALID_COUNT, 3, true);

pristine.addValidator(editImgTagsElem, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

pristine.addValidator(editImgTagsElem, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);

//блокируем кнопку отправки формы при наличии ошибки. Pristine это очему-то не делает
const disableSubmit = () => {
  if (pristine.validate()) {
    submitBtnElem.removeAttribute('disabled');
  } else {
    submitBtnElem.setAttribute('disabled', 'disabled');
  }
};
editImgCommentElem.addEventListener('input', disableSubmit);
editImgTagsElem.addEventListener('input', disableSubmit);

export { pristine };
