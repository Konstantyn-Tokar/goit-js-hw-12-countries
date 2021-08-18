import './sass/main.scss';
import fetchCountries from './fetchCountries';
import listСountry from './templates/countriesList.hbs';
import сardСountry from './templates/сardСountry.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { info, error } from '@pnotify/core';

const debounce = require('lodash.debounce');

const refs = {
  inputCountry: document.querySelector('#country-name'),
  listCountry: document.querySelector('#country-list'),
  resetBtn: document.querySelector('.clear-button'),
};

refs.resetBtn.addEventListener('click', clearAll);
refs.inputCountry.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  if (e.target.value !== '') {
    const country = e.target.value;
    fetchCountries(country)
      .then(r => doTheAnswer(r))
      .catch(() => {
        errorServerMessage();
      });
  }
}

function doTheAnswer(countries) {
  if (countries.length === 1) {
    createCardСountry(countries);
  }
  if (countries.length >= 2 && countries.length <= 10) {
    createCardList(countries);
  }
  if (countries.length > 10) {
    infoMessage();
  }
  if (countries.status === 404) {
    errorMessage();
  }
}

function createCardСountry(countries) {
  refs.listCountry.innerHTML = сardСountry(countries);
}

function createCardList(countries) {
  refs.listCountry.innerHTML = listСountry(countries);
  doS();
}

function errorServerMessage() {
  refs.listCountry.innerHTML = '';
  error({
    title: 'Ошибка',
    text: 'Проблемы с сервером , повоторите попытку позже',
    delay: 2000,
  });
}

function infoMessage() {
  info({
    title: 'Внимание',
    text: 'Пожалуйста, введите более конкретный запрос!',
    delay: 2000,
  });
}

function errorMessage() {
  refs.listCountry.innerHTML = '';
  error({
    title: 'Ошибка',
    text: 'По вашему запросу ничего не найдено',
    delay: 2000,
  });
}

function resetInput() {
  setTimeout(() => {
    refs.inputCountry.value = '';
  }, 1000);
}

function clearAll() {
  refs.listCountry.innerHTML = '';
  refs.inputCountry.value = '';
}

//_______________________________________________________________________________
// С списка стран можно выбрать какую нужно
// Колхозно , могли бы вы посмотреть ?
function doS() {
  const ref = document.querySelector('ul#x');
  ref.addEventListener('click', e => {
    const y = e.target.innerHTML;
    refs.inputCountry.value = y;
    fetchCountries(y)
      .then(r => doTheAnswer(r))
      .catch(() => {
        errorServerMessage();
      });
    resetInput();
  });
}
