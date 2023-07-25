// функции прослушки, обработчики, фильтрация и сортировка миниатюр
import { allPhotos } from './main.js';
import { COUNT_RANDOM_THUMBNAILS, DEBOUNCE_DELAY } from './enums.js';
import { getRandomInteger, compareNumbers, debounce } from './util.js';
import { renderThumbnails, clearThumbnails } from './render-thumbnails.js';

const filtersElem = document.querySelector('.img-filters');
const filterDefaultElem = document.querySelector('#filter-default');
const filterRandomElem = document.querySelector('#filter-random');
const filterDiscussedElem = document.querySelector('#filter-discussed');

const chooseFilter = () => {
  filterDefaultElem.classList.remove('img-filters__button--active');
  filterRandomElem.classList.remove('img-filters__button--active');
  filterDiscussedElem.classList.remove('img-filters__button--active');
  clearThumbnails();
};

const filterDefault = () => {
  filterDefaultElem.classList.add('img-filters__button--active');
  return allPhotos;
};

const filterRandom = () => {
  filterRandomElem.classList.add('img-filters__button--active');

  //делаем выборку 10 случайных
  const randomPhotos = [];
  const randomIndexes = [];
  for (let i = 0; i < COUNT_RANDOM_THUMBNAILS; i++) {
    let index = getRandomInteger(0, allPhotos.length - 1);
    while (randomIndexes.includes(index)) {
      index = getRandomInteger(0, allPhotos.length - 1);
    }
    randomIndexes.push(index);
  }
  randomIndexes.forEach((index) => {
    randomPhotos.push(allPhotos[index]);
  });
  return randomPhotos;
};

const filterDiscussed = () => {
  let discussedPhotos = [];
  filterDiscussedElem.classList.add('img-filters__button--active');
  // сортируем по убыванию
  discussedPhotos = allPhotos.slice().sort(compareNumbers);
  return discussedPhotos;
};

const filtersFuncsMap = {
  'filter-default': filterDefault,
  'filter-random': filterRandom,
  'filter-discussed': filterDiscussed,
};

const setFiltersClick = () => {
  filtersElem.addEventListener('click', (evt) => {
    chooseFilter();
    const filteredPhotos = filtersFuncsMap[evt.target.id]();
    renderThumbnails(filteredPhotos);
  });
};

const showFilters = () => {
  filtersElem.classList.remove('img-filters--inactive');
  setFiltersClick(); //вешает прослушку на весь контейнер с фильтрами
};

export { showFilters };
