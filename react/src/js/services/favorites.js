import Ajax from 'js/services/ajax';
import Imdb from 'js/services/imdb';

const fetch = () => Ajax.get('/favorites');

const fetchMovies = () =>
  fetch().then(favorites =>
    new Promise(resolve => {
      const favoriteIds = favorites.map(favorite => favorite.id);
      resolve(favoriteIds);
    })
  ).then(Imdb.fetchMovies);

const store = movie => {
  const payload = {
    title: movie.Title,
    id: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
}

export default { fetch, fetchMovies, store }



