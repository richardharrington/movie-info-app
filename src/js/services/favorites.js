import csp from 'js-csp';
import Ajax from 'js/services/ajax';
import Imdb from 'js/services/imdb';

function generateIndex(records, key) {
  let index = {};
  records.forEach(record => index[record[key]] = record);
  return index;
}

function fetchMovieStubs() {
  return Ajax.get('/favorites');
}

function fetchMovies() {
  return csp.go(function*() {
    const favorites = yield fetchMovieStubs();
    return yield Imdb.fetchMovies(favorites);
  });
}

function save(movie) {
  const payload = {
    title: movie.Title,
    imdbID: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
}

function del(movie) {
  return Ajax.delete(`/favorites/${movie.imdbID}`);
}

function getIndex() {
  return csp.go(function*() {
    const favorites = yield fetchMovieStubs();
    return generateIndex(favorites, 'imdbID');
  });
}

export default { fetchMovieStubs, fetchMovies, save, getIndex, delete: del }
