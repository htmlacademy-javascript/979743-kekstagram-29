// точка входа. подключен в index.html
//import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
// import { SERVER_URL } from './enums.js';
import { getData, showError } from './server.js';
import { ErrorText } from './enums.js';
import { renderThumbnails } from './render-thumbnails.js';
import { addListenerThumbnailsContainer } from './on-thumbnail-click.js';
import { addListenerForUpload } from './on-upload-click.js';

//из server возвращаем промис, который отдает данные
//потом then и в нем функции отрисовки и прослушки
getData()
  .then((photosData) => {
    renderThumbnails(photosData); // отдали данные на отрисовку
    addListenerThumbnailsContainer(photosData);
  })
  .catch(() => {
    showError(ErrorText.GET_DATA);
  });

addListenerForUpload();
