//вешает прослушку на контейнер с миниатюрами,
//определяет, где был клиен и какой элемент из массива отдать на отрисовку окна просмотра полной фотографии
//делает окно видимым

//import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
import { fillFullPhoto, closeFullPhoto } from './full-photo.js';
import { isEsc, toggleBodyForPopup } from './util.js';

const photosContainerElem = document.querySelector('.pictures');
const fullPhotoContainerElem = document.querySelector('.big-picture'); // дублируется в full-photo
const fullPhotoCloseBtnElem = fullPhotoContainerElem.querySelector('.big-picture__cancel');

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
    // ищем нужный объект в массиве
    const index = data.findIndex((elem) => elem.id === Number(targetElem.id));
    //заполняем данными
    fillFullPhoto(data[index]);
    fullPhotoContainerElem.classList.remove('hidden');
    toggleBodyForPopup();
    fullPhotoCloseBtnElem.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscDown);
  }
};

const setThumbnailsContainerClick = (allPhotosData) => {
  photosContainerElem.addEventListener('click', (evt) => {
    onThumbnailClick(evt, allPhotosData);
  });
};

export { setThumbnailsContainerClick, onCloseClick, onEscDown };
