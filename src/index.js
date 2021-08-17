console.log('Привет, Костя, у тебя всё получиться 😊');
console.log('Ukraine');

//создать рефы
const refs = {
  inputCountry: document.querySelector('#country-name'),
  listCountry: document.querySelector('#country-list'),
};

console.log(refs.listCountry);
console.log(refs.inputCountry);

//повесить на инпут слушатель (input)
refs.inputCountry.addEventListener('input', showСountries);

// console.log(input);

//написать функцию которая ходит на сервер и забирает список стран

function showСountries(e) {
  const query = e.target.value;
  fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(r => r.json())
    .then(makeTheMarkup)
    .catch(err => console.log(err));
}

//написать функция рендеринга HTML при .then

function makeTheMarkup(countrys) {
  console.log(countrys.length);
  const nameCountry = countrys.map(country => `<li>${country.name}</li>`).join('');
  console.log(nameCountry);
  refs.listCountry.innerHTML = nameCountry;
}

//написать функция отображающею ошибку при .catch
