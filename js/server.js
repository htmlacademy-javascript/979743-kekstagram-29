//загружает данные с сервера, обрабатывает ошибки; возвращает промис
import { Url, Method, ErrorText } from './enums.js';

// const downloadErrorElem = document.querySelector('.download-error');
// const downloadErrorText = document.querySelector('.download-error span');

// const showError = (message) => {
//   downloadErrorText.textContent = message;
//   downloadErrorElem.classList.remove('hidden');
//   setTimeout(() => downloadErrorElem.classList.add('hidden'), 5000); // надо ли убирать сообщение??
// };

const load = (url, errorText, method = Method.GET, body = null) =>
  fetch(url, { method, body }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
// .catch(() => {
//   // ЗАЧЕМ ОН ЗДЕСЬ??? ОШИБКУ МОЖНО ОТЛОВИТЬ В MAIN
//   showError(errorText);
//   throw new Error(errorText);
// });

const getData = () => load(Url.GET_DATA, ErrorText.GET_DATA); // возвращает промис

const sendData = (body) => load(Url.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
