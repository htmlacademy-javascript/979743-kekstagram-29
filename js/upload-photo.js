// окно загрузки фото; наложение эффектов.
import { onCloseClick, onEscDown } from './on-upload-click.js';
import { toggleBodyForPopup } from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const editImgForm = document.querySelector('.img-upload__overlay');
const editImgCloseBtn = editImgForm.querySelector('.img-upload__cancel');

const pristine = new Pristine(uploadForm);

const closeEditImg = () => {
  uploadForm.reset();
  pristine.reset();
  // сбросить значения эффектов
  editImgForm.classList.add('hidden');
  toggleBodyForPopup();
  editImgCloseBtn.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscDown);
};

export { closeEditImg };
