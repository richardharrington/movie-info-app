import csp from 'js-csp';
import Ajax from 'js/services/ajax';

const movieRoutes = movieIds =>
  movieIds.map(id => `http://www.omdbapi.com/?i=${id}`);

const movieSearchChan = searchStr => {
  var encodedSearchStr = encodeURIComponent(searchStr);
  return Ajax.get(`http://www.omdbapi.com/?type=movie&s=${encodedSearchStr}`);
}

const fetchMovies = movieIds => {
  return Ajax.parallelGet(movieRoutes(movieIds));
}

const fetchMoviesFromSearch = searchStr =>
  csp.go(function*() {
    const response = yield movieSearchChan(searchStr);
    const movieStubs = response.Search;
    const movieIds = movieStubs.map(movieStub => movieStub.imdbID);
    const movies = yield fetchMovies(movieIds);
    return movies;
  });

const isImageDownloadEnabled = () => (location.hostname === 'localhost');

export default { fetchMovies, fetchMoviesFromSearch, isImageDownloadEnabled };
