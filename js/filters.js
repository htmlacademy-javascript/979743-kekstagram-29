// функции прослушки, обработчики, фильтрация и сортировка миниатюр
import { allPhotos } from './main.js';
import { COUNT_RANDOM_THUMBNAILS } from './enums.js';
import { getRandomInteger, compareNumbers } from './util.js';
import { renderThumbnails, clearThumbnails } from './render-thumbnails.js';

const filtersElem = document.querySelector('.img-filters');
const filterDefaultElem = document.querySelector('#filter-default');
const filterRandomElem = document.querySelector('#filter-random');
const filterDiscussedElem = document.querySelector('#filter-discussed');

const filterDefault = () => {
  filterDefaultElem.classList.add('img-filters__button--active');
  filterRandomElem.classList.remove('img-filters__button--active');
  filterDiscussedElem.classList.remove('img-filters__button--active');
  clearThumbnails();
  renderThumbnails(allPhotos);
};

const filterRandom = () => {
  filterRandomElem.classList.add('img-filters__button--active');
  filterDefaultElem.classList.remove('img-filters__button--active');
  filterDiscussedElem.classList.remove('img-filters__button--active');

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
  clearThumbnails();
  renderThumbnails(randomPhotos);
};

const filterDiscussed = () => {
  let discussedPhotos = [];

  filterDiscussedElem.classList.add('img-filters__button--active');
  filterDefaultElem.classList.remove('img-filters__button--active');
  filterRandomElem.classList.remove('img-filters__button--active');

  // сортируем по убыванию
  discussedPhotos = allPhotos.slice().sort(compareNumbers);
  clearThumbnails();
  renderThumbnails(discussedPhotos);
};

const setDefaultFilter = () => {
  filterDefaultElem.addEventListener('click', filterDefault);
};

const setRandomFilter = () => {
  filterRandomElem.addEventListener('click', filterRandom);
};

const setDiscussedFilter = () => {
  filterDiscussedElem.addEventListener('click', filterDiscussed);
};

const showFilters = () => {
  filtersElem.classList.remove('img-filters--inactive');
  setDefaultFilter();
  setRandomFilter();
  setDiscussedFilter();
};

export { showFilters };
