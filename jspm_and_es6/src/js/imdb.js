import Ajax from 'js/ajax';

const fullMovieRoutes = (movies) =>
  movies.map((movie) => {
    var oid = movie.oid || movie.imdbID;
    return `http://www.omdbapi.com/?i=${oid}`;
  });

const fetchFullMovieRecords = (movies) => {
  var routes = fullMovieRoutes(movies);
  return Ajax.parallelGet(routes);
}

const search = (searchString) => {
  var encodedSearchStr = encodeURIComponent(searchString);
  return Ajax.get(`http://www.omdbapi.com/?type=movie&s=${encodedSearchStr}`);
}

const isImageDownloadAllowed = () => (location.hostname === 'localhost');

export default { fetchFullMovieRecords, search, isImageDownloadAllowed };
