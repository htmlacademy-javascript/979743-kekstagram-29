//загружает данные с сервера, обрабатывает ошибки; возвращает промис
import { Url, Method, ErrorText } from './enums.js';

const downloadErrorElem = document.querySelector('.download-error');
const downloadErrorText = document.querySelector('.download-error span');

const showError = (message) => {
  downloadErrorText.textContent = message;
  downloadErrorElem.classList.remove('hidden');
};

const load = (url, errorText, method = Method.GET, body = null) =>
  fetch(url, { method, body }).then((response) => {
    // проверка кода ответа
    //console.log('response - ', response.status);
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }); // load возвращает промис
// .catch(() => { // ЗАЧЕМ ОН ЗДЕСЬ??? ОШИБКУ МОЖНО ОТЛОВИТЬ В MAIN
//   throw new Error(errorText);
// });

const getData = () => load(Url.DOWNLOAD, ErrorText.GET_DATA); // возвращает промис

export { getData, showError };
