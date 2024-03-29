// формирование окна полноразмерной фотографии и подробной информации
// на входе - объект, соответствующей кликнутой миниатюре

import { toggleBodyForPopup } from './util.js';
import { COMMENTS_PORTION } from './enums.js';
import { onCloseClick, onEscDown } from './set-thumbnail-click.js';

const fullPhotoContainerElem = document.querySelector('.big-picture'); //дублируется в on-thumbnail-click
const imgElem = fullPhotoContainerElem.querySelector('.big-picture__img img');
const likesCountElem = fullPhotoContainerElem.querySelector('.likes-count');
const descriptionElem = fullPhotoContainerElem.querySelector('.social__caption');
const closeBtnElem = fullPhotoContainerElem.querySelector('.big-picture__cancel');
//комменты
const commentsCountElem = fullPhotoContainerElem.querySelector('.comments-count');
const commentsPortionElem = fullPhotoContainerElem.querySelector('.comments-portion'); //доавлен span в разметку
const commentsLoaderElem = fullPhotoContainerElem.querySelector('.comments-loader');
const commentsListElem = fullPhotoContainerElem.querySelector('.social__comments');
const commentsItemElem = fullPhotoContainerElem.querySelector('.social__comment');
const fragment = document.createDocumentFragment(); // для коментов

// для дозагрузки комментов
let currentComments = [];
let commentsPortionCounter = 1;

const renderComment = ({ avatar, message }) => {
  // отрисовываем один комментарий
  const newComment = commentsItemElem.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').textContent = message;
  fragment.append(newComment);
};

const onLoaderClick = () => {
  if ((commentsPortionCounter + 1) * COMMENTS_PORTION - 1 >= currentComments.length - 1) {
    commentsLoaderElem.classList.add('hidden');
  }
  const lastComment = Math.min((commentsPortionCounter + 1) * COMMENTS_PORTION - 1, currentComments.length - 1);
  for (let i = commentsPortionCounter * COMMENTS_PORTION; i <= lastComment; i++) {
    renderComment(currentComments[i]);
  }

  commentsListElem.append(fragment);
  commentsPortionCounter++;
  commentsPortionElem.textContent = lastComment + 1;
};

const closeFullPhoto = () => {
  toggleBodyForPopup();
  fullPhotoContainerElem.classList.add('hidden');
  commentsLoaderElem.classList.remove('hidden');
  commentsPortionCounter = 1;
  commentsLoaderElem.removeEventListener('click', onLoaderClick);
  closeBtnElem.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscDown);
};

const renderComments = (comments) => {
  // отрисовывает первые 5 комментов или меньше, на входе - массив комментов
  // вешает прослушку на дозагрузку комментов
  for (let i = 0; i < Math.min(COMMENTS_PORTION, comments.length); i++) {
    renderComment(comments[i]);
  }
  commentsListElem.innerHTML = '';
  commentsListElem.append(fragment);

  if (comments.length <= COMMENTS_PORTION) {
    commentsLoaderElem.classList.add('hidden');
  }
  // выводим оставшиеся комменты
  commentsLoaderElem.addEventListener('click', onLoaderClick);
};

const fillFullPhoto = ({ url, likes, comments, description }) => {
  // заполняем данными блок размметки
  imgElem.src = url;
  likesCountElem.textContent = likes;
  commentsCountElem.textContent = comments.length;
  commentsPortionElem.textContent = Math.min(COMMENTS_PORTION, comments.length);
  descriptionElem.textContent = description;
  currentComments = comments;
  renderComments(comments);
};

export { fillFullPhoto, closeFullPhoto };
