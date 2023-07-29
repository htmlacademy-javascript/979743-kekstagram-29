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

const definePopup = (popupType) => {
  const closeUploadElem = document.querySelector(`.${popupType}__button`); // кнопка "Круто!"
  const uploadInnerElem = document.querySelector(`.${popupType}__inner`); // окно
  const uploadElem = document.querySelector(`.${popupType}`); // оверлей

  closeUploadElem.addEventListener('click', () => uploadElem.remove());
  uploadInnerElem.addEventListener('click', (evt) => evt.stopPropagation());
  uploadElem.addEventListener('click', () => uploadElem.remove());
};

//для закрытия по ESC нужны две отдельные функции, чтоы можно было удалить прослушку с document
const onEscDownSuccess = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    const uploadElem = document.querySelector('.success'); // оверлей
    uploadElem.remove();
    document.removeEventListener('keydown', onEscDownSuccess);
  }
};

const onEscDownError = (evt) => {
  if (isEsc(evt)) {
    evt.preventDefault();
    const uploadElem = document.querySelector('.error'); // оверлей
    uploadElem.remove();
    document.removeEventListener('keydown', onEscDownError);
  }
};

const closeMessageSuccess = () => {
  definePopup('success');
  document.addEventListener('keydown', onEscDownSuccess);
};

const closeMessageError = () => {
  definePopup('error');
  document.addEventListener('keydown', onEscDownError);
};

const showUploadSucces = () => {
  // блок сообщения об успешной загрузке
  const newSuccessMessage = successMessageElem.cloneNode(true);
  bodyElem.append(newSuccessMessage);
  closeMessageSuccess();
};

const showUploadError = () => {
  // блок сообщения об ошибке при загрузке
  const newErrorMessage = errorMessageElem.cloneNode(true);
  bodyElem.append(newErrorMessage);
  closeMessageError();
};

export { showError, showUploadSucces, showUploadError };
