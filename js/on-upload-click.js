// обрабатывает change на инпуте, открывает и закрывает форму для загрузки изображения
import { isEsc, toggleBodyForPopup } from './util.js';
import { openEditPhoto, closeEditPhoto } from './edit-photo.js';

const uploadFormElem = document.querySelector('#upload-select-image');
const uploadInputElem = uploadFormElem.querySelector('.img-upload__input');
const editImgFormElem = uploadFormElem.querySelector('.img-upload__overlay');
const editImgCloseBtnElem = editImgFormElem.querySelector('.img-upload__cancel');
const editImgCommentElem = editImgFormElem.querySelector('.text__description');
const editImgTagsElem = editImgFormElem.querySelector('.text__hashtags');

const onEscDown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    closeEditPhoto();
  }
};

const onCloseClick = () => {
  closeEditPhoto();
};

//отмена закрытия по ESC, когда в фокусе поле с тегами или комментарием
const cancelEscDown = (evt) => {
  if (isEsc(evt)) {
    evt.stopPropagation();
  }
};
editImgCommentElem.addEventListener('keydown', (evt) => {
  cancelEscDown(evt);
});

editImgTagsElem.addEventListener('keydown', (evt) => {
  cancelEscDown(evt);
});

const onUploadInputChange = () => {
  //открывает форму редактирования, запускает ф-ии для эффектров и масштабирования
  openEditPhoto();
  //editImgForm.classList.remove('hidden');
  toggleBodyForPopup();
  editImgCloseBtnElem.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscDown);
};

const addListenerForUpload = () => {
  uploadInputElem.addEventListener('change', onUploadInputChange);
};

export { addListenerForUpload, onCloseClick, onEscDown };
