// окно редактирования фото;
import { toggleBodyForPopup } from './util.js';
import { SubmitButtonText } from './enums.js';
import { showUploadSucces, showUploadError } from './messages.js';
import { pristine } from './validation.js';
import { onCloseClick, onEscDown } from './on-upload-click.js';
import { initScale, resetScale } from './scale-photo.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './server.js';

const uploadFormElem = document.querySelector('#upload-select-image'); // форма
const editImgFormElem = document.querySelector('.img-upload__overlay');
const editImgCloseBtn = editImgFormElem.querySelector('.img-upload__cancel');
const submitBtnElem = editImgFormElem.querySelector('.img-upload__submit');

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

const blockSubmitBtn = () => {
  submitBtnElem.setAttribute('disabled', 'disabled');
  submitBtnElem.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitBtn = () => {
  submitBtnElem.removeAttribute('disabled');
  submitBtnElem.textContent = SubmitButtonText.IDLE;
};

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitBtn();
    sendData(new FormData(evt.target))
      .then(showUploadSucces)
      .then(closeEditPhoto)
      .catch(showUploadError)
      .finally(unblockSubmitBtn);
  }
};

const openEditPhoto = () => {
  editImgFormElem.classList.remove('hidden');
  initScale();
  initEffects();
  uploadFormElem.addEventListener('submit', onEditFormSubmit);
};

export { openEditPhoto, closeEditPhoto };
