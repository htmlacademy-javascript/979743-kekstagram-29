//отрисовывает все 25 миниатюр; на входе массив с 25-ю объектами
const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture'); //содержимое шаблона
const thumbnailsContainer = document.querySelector('.pictures'); //контейнер
const fragment = document.createDocumentFragment();

const renderThumbnail = ({ url, description, likes, comments }) => {
  // формируем шаблон для одной миниатюры
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent =
    comments.length;
  fragment.append(newThumbnail);
};

// const renderThumbnails = (allPhotos) => {
//   // allPhotos - это массив
//   allPhotos.forEach((photo) => {
//     renderThumbnail(photo);
//   });
//   // renderThumbnail(data[15]);
//   thumbnailsContainer.append(fragment);
// };

const renderThumbnails = (allPhotos) => {
  // allPhotos - это массив
  allPhotos.forEach(({ url, description, likes, comments }) => {
    renderThumbnail({ url, description, likes, comments });
  });
  // renderThumbnail(data[15]);
  thumbnailsContainer.append(fragment);
};

export { renderThumbnails };
// 1. сначала находим template по id, берем его .content
// 2. находим QS вложенный тег
// 3. для оптимизации создаем фрагмент const fragment = document.createDocumentFragment();
// 4. клонируем cloneNode(true) п. 2., схраняя в переменную
// 5. заполняем данными, исп. QS в этой переменной п. 4. для поиска вложенных елементов, их атрибутов, textContent и пр
// 6. fragment.appendChild(element); их может быть много, сколько наклонировали, столько положили в fragment
// 7. отрисовываем разом все содержимое fragment - container.appendChild(fragment);
