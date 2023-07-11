//отрисовывает все 25 миниатюр; на входе массив с 25-ю объектами
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture'); //содержимое шаблона
const thumbnailsContainer = document.querySelector('.pictures'); //контейнер
const fragment = document.createDocumentFragment();

const renderThumbnail = ({ id, url, description, likes, comments }) => {
  // формируем шаблон для одной миниатюры

  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.id = id;
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  //добавляем в разметку id для каждой миниатюры, чтобы по нему потом искать в массиве
  fragment.append(newThumbnail);
};

const renderThumbnails = (allPhotos) => {
  // allPhotos - это массив
  allPhotos.forEach(({ id, url, description, likes, comments }) => {
    renderThumbnail({ id, url, description, likes, comments });
  });
  thumbnailsContainer.append(fragment);
};

export { renderThumbnails };
