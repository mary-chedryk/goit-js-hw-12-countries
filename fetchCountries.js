const BASE_URL = 'https://restcountries.com/v2';

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.json();
    });
}
