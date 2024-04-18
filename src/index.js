import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

breedSelect.addEventListener('change', e => {
  displayCatInfo();
});

function populateBreeds() {
  hideElement(breedSelect);
  showElement(loaderEl);
  fetchBreeds()
    .then(response => {
      hideElement(loaderEl);
      showElement(breedSelect);
      const data = [{ id: '', name: 'Select a breed...' }, ...response.data];
      data
        .map(breed => ({ value: breed.id, text: breed.name }))
        .forEach(option => {
          const opt = document.createElement('option');
          opt.value = option.value;
          opt.textContent = option.text;
          breedSelect.appendChild(opt);
        });
      new SlimSelect({
        select: breedSelect,
        width: '200px',
      });
    })
    .catch(() => {
      notifyError();
      hideElement(loaderEl);
    });
}

function displayCatInfo() {
  const id = breedSelect.value;

  if (!id) {
    return;
  }

  catInfoEl.innerHTML = '';
  showElement(loaderEl);
  fetchCatByBreed(id)
    .then(response => {
      const { data } = response;
      data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.url;
        //img.height = 300;

        const divContainer = document.createElement('div');
        divContainer.classList.add('container');

        const h2 = document.createElement('h2');
        h2.textContent = item.breeds[0].name;

        const p = document.createElement('p');
        p.textContent = item.breeds[0].description;

        const p2 = document.createElement('p');
        p2.innerHTML = `<span class='temperament'>Temperament:</span> ${item.breeds[0].temperament}`;

        divContainer.appendChild(h2);
        divContainer.appendChild(p);
        divContainer.appendChild(p2);

        catInfoEl.appendChild(img);
        catInfoEl.appendChild(divContainer);
      });
      hideElement(loaderEl);
    })
    .catch(() => {
      notifyError();
      hideElement(loaderEl);
    });
}

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

hideElement(loaderEl);
hideElement(errorEl);

function notifyError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

populateBreeds();
