// сообщения об ошибках, об успешной загрузке

import { isEsc } from './util.js';

const bodyElem = document.querySelector('body');
const downloadErrorElem = document.querySelector('.download-error');
const downloadErrorTextElem = document.querySelector('.download-error span');
const successMessageElem = document.querySelector('#success').content.querySelector('.success');
const errorMessageElem = document.querySelector('#error').content.querySelector('.error');

const showError = (message) => {
  // блок сообщения о неудачной загрузке
  downloadErrorTextElem.textContent = message;
  downloadErrorElem.classList.remove('hidden');
};

const onEscDown = (evt, popup) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    const uploadElem = document.querySelector(`.${popup}`); // оверлей
    uploadElem.remove();
  }
};

const closeMessage = (popup) => {
  const closeUploadElem = document.querySelector(`.${popup}__button`); // кнопка "Круто!"
  const uploadInnerElem = document.querySelector(`.${popup}__inner`); // окно
  const uploadElem = document.querySelector(`.${popup}`); // оверлей

  closeUploadElem.addEventListener('click', () => uploadElem.remove());
  uploadInnerElem.addEventListener('click', (evt) => evt.stopPropagation());
  uploadElem.addEventListener('click', () => uploadElem.remove());
  document.addEventListener('keydown', (evt) => onEscDown(evt, popup));
};

const showUploadSucces = () => {
  // блок сообщения об успешной загрузке
  const newSuccessMessage = successMessageElem.cloneNode(true);
  bodyElem.append(newSuccessMessage);
  closeMessage('success');
};

const showUploadError = () => {
  // блок сообщения об ошибке при загрузке
  const newErrorMessage = errorMessageElem.cloneNode(true);
  bodyElem.append(newErrorMessage);
  closeMessage('error');
};

export { showError, showUploadSucces, showUploadError };
