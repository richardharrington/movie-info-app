import Ajax from 'js/ajax';

const fetch = () => new Promise(resolve => {
  Ajax.get('/favorites').then(movies => {
    const movieIds = movies.map(movie => movie.oid);
    resolve(movieIds);
  });
});

const store = movie => {
  const payload = {
    name: movie.Title,
    oid: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
}

export default { fetch, store }



