// открытие и закрытие окна для отображения полноразмерной фотографии и подробной информации
// на входе массив объектов
import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
import { isEsc, toggleBodyForPopup } from './util.js';

const photosContainer = document.querySelector('.pictures');
const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoCloseBtn = fullPhotoContainer.querySelector('.big-picture__cancel');
const fullPhotoImg = fullPhotoContainer.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhotoContainer.querySelector('.likes-count');
const fullPhotoDescription = fullPhotoContainer.querySelector('.social__caption');
//комменты
const fullPhotoCommentsCount = fullPhotoContainer.querySelector('.comments-count');
const fullPhotoCommentsCounter = fullPhotoContainer.querySelector('.social__comment-count');
const fullPhotoCommentsLoader = fullPhotoContainer.querySelector('.comments-loader');
const fullPhotoCommentsList = fullPhotoContainer.querySelector('.social__comments');
const fullPhotoCommentsItem = fullPhotoContainer.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const fullPhotoClose = () => {
  toggleBodyForPopup();
  fullPhotoContainer.classList.add('hidden');
};

const onCloseClick = () => {
  fullPhotoClose();
};

const onEscDown = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    fullPhotoClose();
  }
};

const fillFullPhoto = ({ url, likes, comments, description }) => {
  // заполняем данными блок размметки
  fullPhotoImg.src = url;
  fullPhotoLikesCount.textContent = likes;
  fullPhotoCommentsCount.textContent = comments.length;
  fullPhotoDescription.textContent = description;
  // комменарии, выводим по 5 шт
  for (let i = 0; i < comments.length; i++) {
    const newComment = fullPhotoCommentsItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = comments[i].avatar;
    newComment.querySelector('.social__text').textContent = comments[i].message;
    fragment.append(newComment);
  }

  fullPhotoCommentsList.innerHTML = '';
  fullPhotoCommentsList.append(fragment);
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
