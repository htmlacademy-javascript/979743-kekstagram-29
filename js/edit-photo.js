// окно редактирования фото;
import { toggleBodyForPopup } from './util.js';
import { pristine } from './validation.js';
import { onCloseClick, onEscDown } from './on-upload-click.js';
import { initScale, resetScale } from './scale-photo.js';
import { initEffects, resetEffects } from './effects.js';

const uploadForm = document.querySelector('#upload-select-image');
const editImgForm = document.querySelector('.img-upload__overlay');
const editImgCloseBtn = editImgForm.querySelector('.img-upload__cancel');

const openEditPhoto = () => {
  initScale();
  initEffects();
};

const closeEditPhoto = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  editImgForm.classList.add('hidden');
  toggleBodyForPopup();
  editImgCloseBtn.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscDown);
};

export { openEditPhoto, closeEditPhoto };
