// точка входа. подключен в index.html
//import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
// import { SERVER_URL } from './enums.js';
import { getData } from './server.js';
import { renderThumbnails } from './render-thumbnails.js';
import { addListenerThumbnailsContainer } from './on-thumbnail-click.js';
import { addListenerForUpload } from './on-upload-click.js';

// fetch(SERVER_URL)
//   .then((response) => response.json())
//   .then((photosData) => {
//     renderThumbnails(photosData); // отдали данные на отрисовку
//     addListenerThumbnailsContainer(photosData);
//   });

//надо из server вернуть промис, который загружает данные.
//потом then и в нем функции отрисовки и прослушки
// fetchPhotos.then((photosData) => {
//   console.log('from then');
//   renderThumbnails(photosData); // отдали данные на отрисовку
//   addListenerThumbnailsContainer(photosData);
// });
//из server возвращаем промис, который отдает данные
//потом then и в нем функции отрисовки и прослушки
getData().then((photosData) => {
  renderThumbnails(photosData); // отдали данные на отрисовку
  addListenerThumbnailsContainer(photosData);
});

addListenerForUpload();
