console.log('Привет, Костя, у тебя всё получиться 😊');
console.log('Ukraine');
import fetchCountries from './fetchCountries';
import countryListMarkup from './templates/countriesList.hbs';
import сardСountryMarkup from './templates/сardСountry.hbs';
//добавил debounce
const debounce = require('lodash.debounce');

//создать рефы
const refs = {
  inputCountry: document.querySelector('#country-name'),
  listCountry: document.querySelector('#country-list'),
};
console.log(refs.listCountry);
console.log(refs.inputCountry);

//повесить на инпут слушатель (input)
refs.inputCountry.addEventListener('input', debounce(onInput, 500));

// console.log(input);

//написать функцию которая ходит на сервер и забирает список стран

function onInput(e) {
  const country = e.target.value;
  fetchCountries(country)
    .then(r => makeTheMarkup(r))
    .catch(() => console.log('Жопа'));
}

//написать функция рендеринга HTML при .then

function makeTheMarkup(countries) {
  console.log(countries.length);
  if (countries.length === 1) {
    refs.listCountry.innerHTML = сardСountryMarkup(countries);
  }
  if (countries.length >= 2 && countries.length < 10) {
    refs.listCountry.innerHTML = countryListMarkup(countries);
  }
}

//написать функция отображающею ошибку при .catch
