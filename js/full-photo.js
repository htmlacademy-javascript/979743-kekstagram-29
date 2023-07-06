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

const onCloseFullPhoto = () => {
  // возвращаем видимость временно скрытым блокам
  fullPhotoCommentsCounter.classList.remove('hidden');
  fullPhotoCommentsLoader.classList.remove('hidden');

  body.classList.remove('modal-open');
  fullPhotoContainer.classList.add('hidden');
  // удалить прослушку на закрытие
};

const fillFullPhoto = (src, data) => {
  //находим по src нужный объект в массиве
  const index = data.findIndex((element) => src.includes(element.url));
  console.log('выбран элемент ', index);
  // заполняем данными блок размметки
  fullPhotoImg.src = src;
  fullPhotoLikesCount.textContent = data[index].likes;
  fullPhotoCommentsCount.textContent = data[index].comments.length;
  fullPhotoDescription.textContent = data[index].description;

  // временно скрываем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader
  fullPhotoCommentsCounter.classList.add('hidden');
  fullPhotoCommentsLoader.classList.add('hidden');
};
const onThumbnailClick = (evt, data) => {
  evt.preventDefault();
  if (evt.target.src) {
    //заполняем данными
    fillFullPhoto(evt.target.src, data);

    fullPhotoContainer.classList.remove('hidden');
    body.classList.add('modal-open');
    // закрытие по кнопке
    fullPhotoCloseBtn.addEventListener('click', onCloseFullPhoto); // вешаем прослшку на клик по кнопке закрытия
    // закрытие по ESC
    document.addEventListener('keydown', (evtkey) => {
      if (evtkey.key === 'Escape') {
        evt.preventDefault();
        onCloseFullPhoto();
      }
    });
  }
};

const showFullPhoto = (data) => {
  photosContainer.addEventListener('click', (evt) => {
    onThumbnailClick(evt, data);
  });
};

export { showFullPhoto };

//обраттить внимание: при клике на всплыввающй над минниатюрой блок с лайками окно не открыввается. Дополнить условие
//обраттить внимание: что отображать если комментариев - 0
