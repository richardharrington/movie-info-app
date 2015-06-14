import Ajax from 'js/ajax';

const fetch = () => Ajax.get('/favorites');

const store = (movie) => {
  const payload = {
    name: movie.Title,
    oid: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
}

export default { fetch, store }



