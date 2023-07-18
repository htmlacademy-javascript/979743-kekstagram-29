// точка входа. подключен в index.html
import { allPhotosData } from './data.js'; //получаем массив из 25 объектов
import { renderThumbnails } from './render-thumbnails.js';
import { addListenerThumbnailsContainer } from './on-thumbnail-click.js';
import { addListenerForUpload } from './on-upload-click.js';

renderThumbnails(allPhotosData); // отдали данные на отрисовку
addListenerThumbnailsContainer();
addListenerForUpload();
