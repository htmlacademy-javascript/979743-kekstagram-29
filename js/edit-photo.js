// окно редактирования фото;
import { toggleBodyForPopup } from './util.js';
import { showUploadSucces, showUploadError } from './messages.js';
import { pristine } from './validation.js';
import { onCloseClick, onEscDown } from './on-upload-click.js';
import { initScale, resetScale } from './scale-photo.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './server.js';

const uploadFormElem = document.querySelector('#upload-select-image'); // форма
const editImgFormElem = document.querySelector('.img-upload__overlay');
const editImgCloseBtn = editImgFormElem.querySelector('.img-upload__cancel');

const closeEditPhoto = () => {
  uploadFormElem.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  editImgFormElem.classList.add('hidden');
  toggleBodyForPopup();
  editImgCloseBtn.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscDown);
};

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    // повторная проверка на всякий случай
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => showUploadSucces())
      .then(closeEditPhoto())
      .catch(() => showUploadError());
  }
};

const openEditPhoto = () => {
  editImgFormElem.classList.remove('hidden');
  initScale();
  initEffects();
  // добавить обработку submit для отправки данных формы
  uploadFormElem.addEventListener('submit', onEditFormSubmit);
};

export { openEditPhoto, closeEditPhoto };
