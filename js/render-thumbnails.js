//отрисовывает все 25 миниатюр; на входе массив с 25-ю объектами

const thumbnailTemplateElem = document.querySelector('#picture').content.querySelector('.picture'); //содержимое шаблона
const thumbnailsContainerElem = document.querySelector('.pictures'); //контейнер
const fragment = document.createDocumentFragment();

const clearThumbnails = () => {
  const thumbnails = thumbnailsContainerElem.querySelectorAll('.picture');
  thumbnails.forEach((el) => el.remove());
};

const renderThumbnail = ({ id, url, description, likes, comments }) => {
  // формируем шаблон для одной миниатюры

  const newThumbnail = thumbnailTemplateElem.cloneNode(true);
  //добавляем в разметку id для каждой миниатюры, чтобы по нему потом искать в массиве
  newThumbnail.id = id;
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  fragment.append(newThumbnail);
};

const renderThumbnails = (allPhotos) => {
  clearThumbnails();
  allPhotos.forEach(({ id, url, description, likes, comments }) => {
    renderThumbnail({ id, url, description, likes, comments });
  });
  thumbnailsContainerElem.append(fragment);
};

export { renderThumbnails };
