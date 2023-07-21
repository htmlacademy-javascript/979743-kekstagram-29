//загружает данные с сервера, обрабатывает ошибки; возвращает промис
import { SERVER_URL } from './enums.js';

const forResolve = (resolve, reject) => {
  // сценарий успешной загрузки
  let dataFromServer = [];
  fetch(SERVER_URL)
    .then((response) => {
      // проверка кода ответа
      console.log('response - ', response);
      if (response.status === 200) {
        dataFromServer = response.json();
        resolve(dataFromServer);
      } else {
        reject('что-то сломалось, данных нет, нарисовать ничего не можем');
      }
    })
    .catch((message) => alert(message));
};

// fetch(SERVER_URL)
//   .then((response) => response.json())
//   .then((photosData) => {
//     renderThumbnails(photosData); // отдали данные на отрисовку
//     addListenerThumbnailsContainer(photosData);
//   });

const fetchPhotos = new Promise(forResolve);

export { fetchPhotos };
