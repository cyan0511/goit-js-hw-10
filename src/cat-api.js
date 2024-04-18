import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_okrONWbjQrz6SCconeWzuvXuWg8dXc5Yb8x1pIg0TBpJPBGHAOmdsRyqKQcK1b3t';

const API_ENDPOINT = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get(`${API_ENDPOINT}breeds`);
}

export function fetchCatByBreed(id) {
  const url = `${API_ENDPOINT}images/search?breed_ids=${id}`;
  return axios.get(url);
}
