import csp from 'js-csp';
import Ajax from 'js/services/ajax';
import Imdb from 'js/services/imdb';

const generateIndex = (records, key) => {
  let index = {};
  records.forEach(record => index[record[key]] = record);
  return index;
}

const fetch = () => Ajax.get('/favorites');

const fetchMovies = () =>
  csp.go(function*() {
    const favorites = yield fetch();
    const favoriteIds = favorites.map(favorite => favorite.imdbID);
    const movies = yield Imdb.fetchMovies(favoriteIds);
    return movies;
  });

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
  csp.go(function*() {
    const favorites = yield fetch();
    return generateIndex(favorites);
  });

export default { fetch, fetchMovies, save, getIndex, delete: del }
