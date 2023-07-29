// точка входа. подключен в index.html
//import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
// import { SERVER_URL } from './enums.js';
import { showError } from './messages.js';
import { debounce } from './util.js';
import { getData } from './server.js';
import { ErrorText, DEBOUNCE_DELAY } from './enums.js';
import { renderThumbnails } from './render-thumbnails.js';
import { setThumbnailsContainerClick } from './set-thumbnail-click.js';
import { setFiltersClick } from './filters.js';
import { setUploadClick } from './set-upload-click.js';

// let allPhotos = []; // ??? let экспортируются ???

//из server возвращаем промис, который отдает данные
//потом then и в нем функции отрисовки и прослушки
getData()
  .then((photosData) => {
    // allPhotos = photosData;
    renderThumbnails(photosData); // отдали данные на отрисовку
    setThumbnailsContainerClick(photosData);
    setFiltersClick(debounce(renderThumbnails, DEBOUNCE_DELAY), photosData);
  })
  // .then(setFiltersClick)
  .catch(() => {
    showError(ErrorText.GET_DATA);
  });

setUploadClick(); //если фотографии не загрузились, все равно вызывается

// export { allPhotos };
