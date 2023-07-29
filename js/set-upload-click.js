// обрабатывает change на инпуте, открывает и закрывает форму для загрузки изображения
import { isEsc, toggleBodyForPopup } from './util.js';
import { openEditPhoto, closeEditPhoto } from './edit-photo.js';
import { FILE_TYPES } from './enums.js';

const uploadFormElem = document.querySelector('#upload-select-image');
const uploadInputElem = uploadFormElem.querySelector('.img-upload__input');
const editImgFormElem = uploadFormElem.querySelector('.img-upload__overlay');
const editImgCloseBtnElem = editImgFormElem.querySelector('.img-upload__cancel');
const editImgCommentElem = editImgFormElem.querySelector('.text__description');
const editImgTagsElem = editImgFormElem.querySelector('.text__hashtags');
const previewContainerElem = document.querySelector('.img-upload__preview');
const previewPictureElem = previewContainerElem.querySelector('.img-upload__preview img');
const previewEffectsElem = document.querySelectorAll('.effects__preview');

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

const choosePicrures = () => {
  previewPictureElem.src = ''; // чтобы не показывалось изоб по умолчанию или предыдущее
  previewContainerElem.style.backgroundColor = 'transparent';
  const file = uploadInputElem.files[0];
  const matches = FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it));
  if (matches) {
    previewPictureElem.src = URL.createObjectURL(file);
    previewEffectsElem.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

const onUploadInputChange = () => {
  // даем пользователю выбрать файл
  choosePicrures();
  //открывает форму редактирования, запускает ф-ии для эффектров и масштабирования
  openEditPhoto();
  //editImgForm.classList.remove('hidden');
  toggleBodyForPopup();
  editImgCloseBtnElem.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscDown);
};

const setUploadClick = () => {
  uploadInputElem.addEventListener('change', onUploadInputChange);
};

export { setUploadClick, onCloseClick, onEscDown };
