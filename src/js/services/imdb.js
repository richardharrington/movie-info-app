import csp from 'js-csp';
import Ajax from 'js/services/ajax';

const movieSearchEndpoint = 'http://www.omdbapi.com/?type=movie&s=';
const movieEndpoint = 'http://www.omdbapi.com/?i=';

function movieUrls(movieStubs) {
  return movieStubs.map(stub => movieEndpoint + stub.imdbID);
}

function fetchMovieStubsFromSearch(searchStr) {
  return csp.go(function*() {
    const url = movieSearchEndpoint + encodeURIComponent(searchStr);
    const {Search: movieStubs} = yield Ajax.get(url);
    return movieStubs;
  });
}

function fetchMovies(movieStubs) {
  return Ajax.getParallel(movieUrls(movieStubs));
}

function searchForMovies(searchStr) {
  return csp.go(function*() {
    const movieStubs = yield fetchMovieStubsFromSearch(searchStr);
    return yield fetchMovies(movieStubs);
  });
}

function isImageDownloadEnabled() {
  return (location.hostname === 'localhost');
}

export default { fetchMovies, searchForMovies, isImageDownloadEnabled };
