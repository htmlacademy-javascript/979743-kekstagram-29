//загружает данные с сервера, обрабатывает ошибки; возвращает промис
import { Url, Method, ErrorText } from './enums.js';

const load = (url, errorText, method = Method.GET, body = null) =>
  fetch(url, { method, body })
    .then((response) => {
      // проверка кода ответа
      //console.log('response - ', response.status);
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    }); // load возвращает промис

const getData = () => load(Url.DOWNLOAD, ErrorText.GET_DATA); // возвращает промис

export { getData };
