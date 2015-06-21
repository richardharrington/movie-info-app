import Ajax from 'js/ajax';

const fetch = () => new Promise(resolve => {
  Ajax.get('/favorites').then(movies => {
    const movieIds = movies.map(movie => movie.id);
    resolve(movieIds);
  });
});

const store = movie => {
  const payload = {
    title: movie.Title,
    id: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
}

export default { fetch, store }



