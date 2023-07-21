// точка входа. подключен в index.html
//import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
import { renderThumbnails } from './render-thumbnails.js';
import { addListenerThumbnailsContainer } from './on-thumbnail-click.js';
import { addListenerForUpload } from './on-upload-click.js';

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photosData) => {
    renderThumbnails(photosData); // отдали данные на отрисовку
    addListenerThumbnailsContainer(photosData);
  });

addListenerForUpload();
