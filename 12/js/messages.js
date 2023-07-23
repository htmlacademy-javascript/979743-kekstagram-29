// сообщения об ошибках, об успешной загрузке

const downloadErrorElem = document.querySelector('.download-error');
const downloadErrorText = document.querySelector('.download-error span');

const showError = (message) => {
  downloadErrorText.textContent = message;
  downloadErrorElem.classList.remove('hidden');
  setTimeout(() => downloadErrorElem.classList.add('hidden'), 5000); // надо ли убирать сообщение??
};

export { showError };
