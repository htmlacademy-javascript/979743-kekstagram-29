// валидация комментариев и хэш-тегов
// потом дописать отдельную валидацию для каждого вида ошибки, чтоб было соотв сообщение пользователю
import { MAX_HASHTAG_COUNT, ErrorText, VALID_SYMBOLS } from './enums.js';
import { normalizeTags } from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const editImgForm = document.querySelector('.img-upload__overlay');
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

export { pristine };
