// точка входа. подключен в index.html
//import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
// import { SERVER_URL } from './enums.js';
import { showError } from './messages.js';
import { debounce } from './util.js';
import { getData } from './server.js';
import { ErrorText, DEBOUNCE_DELAY } from './enums.js';
import { renderThumbnails } from './render-thumbnails.js';
import { addListenerThumbnailsContainer } from './on-thumbnail-click.js';
import { setFiltersClick } from './filters.js';
import { addListenerForUpload } from './on-upload-click.js';

let allPhotos = []; // ??? let экспортируются ???

//из server возвращаем промис, который отдает данные
//потом then и в нем функции отрисовки и прослушки
getData()
  .then((photosData) => {
    allPhotos = photosData;
    renderThumbnails(photosData); // отдали данные на отрисовку
    addListenerThumbnailsContainer(photosData);
    setFiltersClick(debounce(renderThumbnails, DEBOUNCE_DELAY), allPhotos);
  })
  // .then(setFiltersClick)
  .catch(() => {
    showError(ErrorText.GET_DATA);
  });

addListenerForUpload(); //если фотографии не загрузились, все равно вызывается

export { allPhotos };
