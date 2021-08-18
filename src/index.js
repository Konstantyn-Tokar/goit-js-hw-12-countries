console.log('Привет, Костя, у тебя всё получиться 😊');
console.log('Ukraine');
import fetchCountries from './fetchCountries';
import countryListMarkup from './templates/countriesList.hbs';
import сardСountryMarkup from './templates/сardСountry.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';

// error({
//   title: `Too many matches found.`,
//   text: `We found  countries. Please enter a more specific query!`,
//   styling: 'brighttheme',
//   delay: 2000,
// });
const debounce = require('lodash.debounce');
//добавил debounce

//создать рефы
const refs = {
  inputCountry: document.querySelector('#country-name'),
  listCountry: document.querySelector('#country-list'),
};

//повесить на инпут слушатель (input)
refs.inputCountry.addEventListener('input', debounce(onInput, 500));
//написать функцию которая ходит на сервер и забирает список стран
function onInput(e) {
  const country = e.target.value;
  fetchCountries(country)
    .then(r => doTheAnswer(r))
    .catch(() => errorServerMessage());
}

//написать функция рендеринга HTML при .then

function doTheAnswer(countries) {
  if (countries.length === 1) {
    refs.listCountry.innerHTML = сardСountryMarkup(countries);
  }
  if (countries.length >= 2 && countries.length <= 10) {
    refs.listCountry.innerHTML = countryListMarkup(countries);
  }
  if (countries.length > 10) {
    info({
      title: 'Внимание',
      text: 'Пожалуйста, введите более конкретный запрос!',
      delay: 2000,
    });
  }
  if (countries.status === 404) {
    resetInput();
    errorMessage();
  }
}

//написать функция отображающею ошибки

function errorServerMessage() {
  refs.listCountry.innerHTML = '';
  error({
    title: 'Ошибка',
    text: 'Проблемы с сервером , повоторите попЫтку позже',
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
  }, 2000);
}
