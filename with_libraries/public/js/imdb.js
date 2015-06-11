var Ajax = require('./ajax');

function fullMovieRoutes(movies) {
  return movies.map(function(movie) {
    var oid = movie.oid || movie.imdbID;
    return 'http://www.omdbapi.com/?i=' + oid;
  });
}

function fetchFullMovieRecords(movies, callback) {
  var routes = fullMovieRoutes(movies);
  Ajax.parallelGet(routes, callback);
}

function search(searchString, callback) {
  Ajax.get('http://www.omdbapi.com/?type=movie&s=' +
           encodeURIComponent(searchString), callback);
}

function isImageDownloadAllowed() {
  return location.hostname === 'localhost';
}

var Imdb = {
  fetchFullMovieRecords: fetchFullMovieRecords,
  search: search,
  isImageDownloadAllowed: isImageDownloadAllowed
};

module.exports = Imdb;