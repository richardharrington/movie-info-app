import Ajax from 'js/services/ajax';
import Imdb from 'js/services/imdb';

const fetch = () => Ajax.get('/favorites');

const fetchMovies = () =>
  fetch().then(favorites =>
    new Promise(resolve => {
      const favoriteIds = favorites.map(favorite => favorite.imdbID);
      resolve(favoriteIds);
    })
  ).then(Imdb.fetchMovies);

const save = movie => {
  const payload = {
    title: movie.Title,
    imdbID: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
}

const del = movie => {
  return Ajax.delete(`/favorites/${movie.imdbID}`);
}

const getIndex = () =>
  new Promise(resolve =>
    fetch().then(favorites => {
      let index = {};
      favorites.forEach(favorite => index[favorite.imdbID] = true);
      resolve(index);
    })
  );

export default { fetch, fetchMovies, save, getIndex, delete: del }
