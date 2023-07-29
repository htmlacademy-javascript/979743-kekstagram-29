//загружает данные с сервера и на сервер, обрабатывает ошибки; возвращает промисы

import { Url, Method, ErrorText } from './enums.js';

const load = (url, errorText, method = Method.GET, body = null) =>
  fetch(url, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Url.GET_DATA, ErrorText.GET_DATA); // возвращает промис

const sendData = (body) => load(Url.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body); // возвращает промис

export { getData, sendData };
