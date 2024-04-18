import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

breedSelect.addEventListener('change', e => {
  catInfoEl.innerHTML = '';
  showElement(loaderEl);
  fetchCatByBreed(e.target.value).then(response => {
    const { data } = response;
    console.log(data);
    data.forEach(item => {
      const img = document.createElement('img');
      img.src = item.url;
      img.height = 300;

      const divContainer = document.createElement('div');
      divContainer.classList.add('container');

      const h2 = document.createElement('h2');
      h2.textContent = item.breeds[0].name;

      const p = document.createElement('p');
      p.textContent = item.breeds[0].description;

      divContainer.appendChild(h2);
      divContainer.appendChild(p);

      catInfoEl.appendChild(img);
      catInfoEl.appendChild(divContainer);
    });
    hideElement(loaderEl);
  });
});

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

hideElement(loaderEl);
hideElement(errorEl);

function populateBreeds() {
  hideElement(breedSelect);
  showElement(loaderEl);
  fetchBreeds().then(response => {
    hideElement(loaderEl);
    showElement(breedSelect);
    response.data
      .map(breed => ({ value: breed.id, text: breed.name }))
      .forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        breedSelect.appendChild(opt);
      });
  });
}

populateBreeds();
