import Ajax from 'js/ajax';

const fullMovieRoutes = movies =>
  movies.map(movie => {
    var oid = movie.oid || movie.imdbID;
    return `http://www.omdbapi.com/?i=${oid}`;
  });

const fetchFullMovieRecords = movies => {
  var routes = fullMovieRoutes(movies);
  return Ajax.parallelGet(routes);
}

const searchForMovies = searchStr =>
  new Promise(resolve => {
    var encodedSearchStr = encodeURIComponent(searchStr);
    Ajax.get(`http://www.omdbapi.com/?type=movie&s=${encodedSearchStr}`)
      .then(response => {
        const movies = response.Search;
        resolve(movies);
      });
  });

const isImageDownloadEnabled = () => (location.hostname === 'localhost');

export default { fetchFullMovieRecords, searchForMovies, isImageDownloadEnabled };
