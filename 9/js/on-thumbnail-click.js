//вешает прослушку на контейнер с миниатюрами,
//определяет, где был клиен и какой элемент из массива отдать на отрисовку окна просмотра полной фотографии
//делает окно видимым
import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
import { fillFullPhoto, closeFullPhoto } from './full-photo.js';
import { isEsc, toggleBodyForPopup } from './util.js';

const photosContainer = document.querySelector('.pictures');
const fullPhotoContainer = document.querySelector('.big-picture'); // дублируется в full-photo
const fullPhotoCloseBtn = fullPhotoContainer.querySelector('.big-picture__cancel');

const onCloseClick = () => {
  closeFullPhoto();
};

const onEscDown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const onThumbnailClick = (evt, data) => {
  const targetElem = evt.target.closest('.picture');
  if (targetElem) {
    evt.preventDefault();
    //заполняем данными
    fillFullPhoto(data[targetElem.id - 1]);
    fullPhotoContainer.classList.remove('hidden');
    toggleBodyForPopup();
  }
};

const addListenerThumbnailsContainer = () => {
  photosContainer.addEventListener('click', (evt) => {
    onThumbnailClick(evt, allPhotosData);
    fullPhotoCloseBtn.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscDown);
  });
};

export { addListenerThumbnailsContainer };
