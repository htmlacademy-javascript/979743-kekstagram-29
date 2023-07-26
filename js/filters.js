// функция прослушки, обработчики, фильтрация и сортировка миниатюр

import { COUNT_RANDOM_THUMBNAILS } from './enums.js';
import { getRandomInteger, compareNumbers } from './util.js';

const filtersElem = document.querySelector('.img-filters');
const filterDefaultElem = document.querySelector('#filter-default');
const filterRandomElem = document.querySelector('#filter-random');
const filterDiscussedElem = document.querySelector('#filter-discussed');

const chooseFilter = () => {
  filterDefaultElem.classList.remove('img-filters__button--active');
  filterRandomElem.classList.remove('img-filters__button--active');
  filterDiscussedElem.classList.remove('img-filters__button--active');
};

const filterDefault = (allPhotos) => {
  filterDefaultElem.classList.add('img-filters__button--active');
  return allPhotos;
};

const filterRandom = (allPhotos) => {
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

const filterDiscussed = (allPhotos) => {
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

const setFiltersClick = (cb, allPhotos) => {
  filtersElem.classList.remove('img-filters--inactive');
  filtersElem.addEventListener('click', (evt) => {
    chooseFilter();
    const filteredPhotos = filtersFuncsMap[evt.target.id](allPhotos);
    cb(filteredPhotos);
  });
};

export { setFiltersClick };
