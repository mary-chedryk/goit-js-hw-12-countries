import './styles.css';
import fetchCountries from './fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import debounce from 'lodash.debounce';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchInput: document.querySelector('#search-input'),
  resultContainer: document.querySelector('.js-result'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  if (!searchQuery) {
    clearResult();
    return;
  }

  fetchCountries(searchQuery)
    .then(renderCountries)
    .catch(err => {
      clearResult();
      error({
        text: 'Country not found',
        delay: 2000,
      });
    });
}

function renderCountries(countries) {
  clearResult();

  if (countries.length > 10) {
    notice({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
    return;
  }

  if (countries.length >= 2 && countries.length <= 10) {
    refs.resultContainer.innerHTML = countriesListTpl(countries);
    return;
  }

  if (countries.length === 1) {
    refs.resultContainer.innerHTML = countryCardTpl(countries[0]);
  }
}

function clearResult() {
  refs.resultContainer.innerHTML = '';
}
