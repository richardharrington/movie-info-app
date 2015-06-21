import Ajax from 'js/services/ajax';

const movieRoutes = movieIds =>
  movieIds.map(id => `http://www.omdbapi.com/?i=${id}`);

const fetchMovies = movieIds => {
  return Ajax.parallelGet(movieRoutes(movieIds));
}

const fetchMoviesFromSearch = searchStr =>
  new Promise(resolve => {
    var encodedSearchStr = encodeURIComponent(searchStr);
    Ajax.get(`http://www.omdbapi.com/?type=movie&s=${encodedSearchStr}`)
      .then(response => {
        const movies = response.Search;
        const movieIds = movies.map(movie => movie.imdbID);
        resolve(movieIds);
      });
  }).then(fetchMovies);

const isImageDownloadEnabled = () => (location.hostname === 'localhost');

export default { fetchMovies, fetchMoviesFromSearch, isImageDownloadEnabled };
