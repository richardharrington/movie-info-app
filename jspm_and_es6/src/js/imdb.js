import Ajax from 'js/ajax';

const fullMovieRoutes = (movies) =>
  movies.map((movie) => {
    var oid = movie.oid || movie.imdbID;
    return `http://www.omdbapi.com/?i=${oid}`;
  });

const fetchFullMovieRecords = (movies, callback) => {
  var routes = fullMovieRoutes(movies);
  Ajax.parallelGet(routes, callback);
}

const search = (searchString, callback) => {
  var encodedSearchStr = encodeURIComponent(searchString);
  Ajax.get(`http://www.omdbapi.com/?type=movie&s=${encodedSearchStr}`, callback);
}

const isImageDownloadAllowed = () => (location.hostname === 'localhost');

export default { fetchFullMovieRecords, search, isImageDownloadAllowed };
