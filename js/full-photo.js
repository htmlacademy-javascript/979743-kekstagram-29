// формирование окна полноразмерной фотографии и подробной информации
// на входе - объект, соответствующей кликнутой миниатюре
import { toggleBodyForPopup } from './util.js';
import { COMMENTS_PORTION } from './enums.js';

const fullPhotoContainer = document.querySelector('.big-picture'); //дублируется в on-thumbnail-click
const img = fullPhotoContainer.querySelector('.big-picture__img img');
const likesCount = fullPhotoContainer.querySelector('.likes-count');
const fullPhotoDescription = fullPhotoContainer.querySelector('.social__caption');
//комменты
const fullPhotoCommentsCount = fullPhotoContainer.querySelector('.comments-count');
const commentsPortion = fullPhotoContainer.querySelector('.comments-portion'); //доавлен span в разметку
const commentsLoader = fullPhotoContainer.querySelector('.comments-loader');
const fullPhotoCommentsList = fullPhotoContainer.querySelector('.social__comments');
const fullPhotoCommentsItem = fullPhotoContainer.querySelector('.social__comment');
const fragment = document.createDocumentFragment(); // для коментов

// для дозагрузки комментов
let currentComments = [];
let commentsPortionCounter = 1; //глобальные переменные, я не придумала, как без них обойтись

const renderComment = ({ avatar, message }) => {
  // отрисовывает один комментарий
  const newComment = fullPhotoCommentsItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').textContent = message;
  fragment.append(newComment);
};

const onLoaderClick = () => {
  if ((commentsPortionCounter + 1) * COMMENTS_PORTION - 1 >= currentComments.length - 1) {
    commentsLoader.classList.add('hidden');
  }
  const lastComment = Math.min((commentsPortionCounter + 1) * COMMENTS_PORTION - 1, currentComments.length - 1);
  for (let i = commentsPortionCounter * COMMENTS_PORTION; i <= lastComment; i++) {
    renderComment(currentComments[i]);
  }

  fullPhotoCommentsList.append(fragment);
  commentsPortionCounter++;
  commentsPortion.textContent = lastComment + 1;
};

const closeFullPhoto = () => {
  toggleBodyForPopup();
  fullPhotoContainer.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  commentsPortionCounter = 1;
  commentsLoader.removeEventListener('click', onLoaderClick);
};

const renderComments = (comments) => {
  // отрисовывает первые 5 комментов или меньше, на входе - массив комментов
  // вешает прослушку на дозагрузку комментов
  for (let i = 0; i < Math.min(COMMENTS_PORTION, comments.length); i++) {
    renderComment(comments[i]);
  }
  fullPhotoCommentsList.innerHTML = '';
  fullPhotoCommentsList.append(fragment);

  if (comments.length <= COMMENTS_PORTION) {
    commentsLoader.classList.add('hidden');
  }
  // выводим оставшиеся комменты
  commentsLoader.addEventListener('click', onLoaderClick);
};

const fillFullPhoto = ({ url, likes, comments, description }) => {
  // заполняем данными блок размметки
  img.src = url;
  likesCount.textContent = likes;
  fullPhotoCommentsCount.textContent = comments.length;
  commentsPortion.textContent = Math.min(COMMENTS_PORTION, comments.length);
  fullPhotoDescription.textContent = description;
  currentComments = comments;
  renderComments(comments);
};

export { fillFullPhoto, closeFullPhoto };
