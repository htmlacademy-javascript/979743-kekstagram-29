// обрабатывает change на инпуте, открывает и закрывает форму для загрузки изображения
import { isEsc, toggleBodyForPopup } from './util.js';
import { closeEditImg, openEditImg } from './upload-photo.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const editImgForm = uploadForm.querySelector('.img-upload__overlay');
const editImgCloseBtn = editImgForm.querySelector('.img-upload__cancel');
const editImgComment = editImgForm.querySelector('.text__description');
const editImgTags = editImgForm.querySelector('.text__hashtags');

const onEscDown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    closeEditImg();
  }
};

const onCloseClick = () => {
  closeEditImg();
};

//отмена закрытия по ESC, когда в фокусе поле с тегами или комментарием
const cancelEscDown = (evt) => {
  if (isEsc(evt)) {
    evt.stopPropagation();
  }
};
editImgComment.addEventListener('keydown', (evt) => {
  cancelEscDown(evt);
});

editImgTags.addEventListener('keydown', (evt) => {
  cancelEscDown(evt);
});

const onUploadInputChange = () => {
  //открывает форму редактирования, запускает ф-ии для эффектров и масштабирования
  openEditImg();
  editImgForm.classList.remove('hidden');
  toggleBodyForPopup();
  editImgCloseBtn.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscDown);
};

const addListenerForUpload = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
};

export { addListenerForUpload, onCloseClick, onEscDown };
