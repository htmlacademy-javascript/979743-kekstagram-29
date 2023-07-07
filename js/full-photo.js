// открытие и закрытие окна для отображения полноразмерной фотографии и подробной информации
// на входе массив объектов
const body = document.querySelector('body'); //????
const photosContainer = document.querySelector('.pictures');
const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoCloseBtn = fullPhotoContainer.querySelector('.big-picture__cancel');
const fullPhotoImg = fullPhotoContainer.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhotoContainer.querySelector('.likes-count');
const fullPhotoCommentsCount = fullPhotoContainer.querySelector('.comments-count');
const fullPhotoDescription = fullPhotoContainer.querySelector('.social__caption');
// временно скрываем
const fullPhotoCommentsCounter = fullPhotoContainer.querySelector('.social__comment-count');
const fullPhotoCommentsLoader = fullPhotoContainer.querySelector('.comments-loader');

//комменты
const fullPhotoCommentsList = fullPhotoContainer.querySelector('.social__comments');
const fullPhotoCommentsItem = fullPhotoContainer.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const onCloseClick = () => {
  fullPhotoClose();
};

const onEscDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    fullPhotoClose();
  }
};

function fullPhotoClose() {
  // именно эта нотация; эта функция вызывается в коде выше; поменять местами тоже нельзя
  // возвращаем видимость временно скрытым блокам
  fullPhotoCommentsCounter.classList.remove('hidden');
  fullPhotoCommentsLoader.classList.remove('hidden');

  body.classList.remove('modal-open');
  fullPhotoContainer.classList.add('hidden');

  // очисщаем список комментов
  fullPhotoCommentsList.innerHTML = '';

  // удаляем прослушку на закрытие
  fullPhotoCloseBtn.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscDown);
}

const fillFullPhoto = ({ url, likes, comments, description }) => {
  // заполняем данными блок размметки
  fullPhotoImg.src = url;
  fullPhotoLikesCount.textContent = likes;
  fullPhotoCommentsCount.textContent = comments.length;
  fullPhotoDescription.textContent = description;
  // комменарии
  for (let i = 0; i < comments.length; i++) {
    const newComment = fullPhotoCommentsItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = comments[i].avatar;
    newComment.querySelector('.social__text').textContent = comments[i].message;
    fragment.append(newComment);
  }

  fullPhotoCommentsList.innerHTML = '';
  fullPhotoCommentsList.append(fragment);

  // временно скрываем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader
  fullPhotoCommentsCounter.classList.add('hidden');
  fullPhotoCommentsLoader.classList.add('hidden');
};

const onThumbnailClick = (evt, data) => {
  const targetImgSrc = evt.target.closest('.picture').childNodes[1].src;
  // не знаю, почему, но img - второй элемент в коллекции дочерних узлов
  if (targetImgSrc) {
    evt.preventDefault();
    //находим по src нужный объект в массиве
    const index = data.findIndex((element) => targetImgSrc.includes(element.url));

    //заполняем данными
    fillFullPhoto(data[index]);

    fullPhotoContainer.classList.remove('hidden');
    body.classList.add('modal-open');
    // закрытие по клику на крестик и ESC
    fullPhotoCloseBtn.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscDown);
  }
};

const showFullPhoto = (data) => {
  photosContainer.addEventListener('click', (evt) => {
    onThumbnailClick(evt, data);
  });
};

export { showFullPhoto };

// нужно ли допиливать открытие по enter? табуляция и пр...
