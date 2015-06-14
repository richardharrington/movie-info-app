import Dom from 'js/dom';
import Ajax from 'js/ajax';
import Imdb from 'js/imdb';

var displayMap = {
  Year: "Year",
  Rated: "Rated",
  Released: "Released",
  Runtime: "Runtime",
  Genre: "Genre",
  Director: "Director",
  Writer: "Writer",
  Actors: "Actors",
  Plot: "Plot",
  Language: "Language",
  Country: "Country",
  Awards: "Awards",
  Metascore: "Metascore",
  imdbRating: "IMDB Rating",
  imdbVotes: "IMDB Votes"
};

function fetchFavorites(callback) {
  Ajax.get('/favorites', callback);
}

function storeFavorite(movie) {
  var payload = {
    name: movie.Title,
    oid: movie.imdbID
  };
  Ajax.post('/favorites', payload);
}

function movieEl(movie) {
  var fields = Object.keys(movie).filter(function(key) {
    var isFieldInListOfFieldsToDisplay = !!displayMap[key];
    return isFieldInListOfFieldsToDisplay && movie[key] !== 'N/A';
  }).map(function(key) {
    return {
      name: displayMap[key],
      content: movie[key]
    };
  });

  var fieldEls = fields.map(function(field) {
    var fieldNameEl = Dom.el('td', {className: 'field-name'}, field.name);
    var fieldContentEl = Dom.el('td', {className: 'field-content'}, field.content);
    return Dom.el('tr', null, [fieldNameEl, fieldContentEl]);
  });

  var areImagesAllowed = Imdb.isImageDownloadAllowed();

  var favorite = Dom.el('span', {className: "favorite-query"}, "Favorite?");
  var movieTitle = Dom.el('h3', {className: "movie-title"}, movie.Title);
  var movieInfo = Dom.el('table', {className: "movie-info"}, fieldEls);
  var movieComponents = [favorite, movieTitle, movieInfo];
  var showPoster = areImagesAllowed && movie.Poster && movie.Poster !== 'N/A';
  if (showPoster) {
    var moviePoster = Dom.el('img', {src: movie.Poster, className: 'movie-poster'});
    movieComponents = movieComponents.concat(moviePoster);
  }
  var movieClassName = areImagesAllowed ? "movie" : "movie wide";
  var movieEl = Dom.el('li', {className: movieClassName}, movieComponents);

  movieEl.onclick = function() {
    Dom.toggleClass(movieEl, 'expand');
  }

  favorite.addEventListener('click', function favoriteEventListener(event) {
    event.stopPropagation();
    favorite.innerHTML = "favorited!";
    Dom.addClass(movieEl, 'favorite');
    storeFavorite(movie);
    favorite.removeEventListener('click', favoriteEventListener);
  }, false);

  return movieEl;
}

function makeMoviesRenderer(parentEl) {
  return function(movies) {
    // movies = sortBy(movies, 'Title');
    var movieEls = movies.map(movieEl);
    Dom.replaceChildren(parentEl, movieEls);
  }
}

function launchSearch(textInput, callback) {
  var searchString = textInput.value.trim();
  Imdb.search(searchString, function(response) {
    var movies = response.Search;
    Imdb.fetchFullMovieRecords(movies, callback);
  });
}

function main() {
  var submitButton = Dom.$("button[type=submit]");
  var fetchFavoritesLink = Dom.$(".fetch-favorites");
  var textInput = Dom.$("input[name=searchBox]");
  var movieList = Dom.$(".movie-list");
  var renderMovies = makeMoviesRenderer(movieList);

  submitButton.onclick = function() {
    launchSearch(textInput, renderMovies);
  };

  textInput.onkeypress = function(event) {
    var keyCode = event.which ? event.which : event.keyCode;
    if (keyCode === 13) {
      launchSearch(textInput, renderMovies);
    }
  };

  fetchFavoritesLink.onclick = function() {
    fetchFavorites(function(movies) {
      Imdb.fetchFullMovieRecords(movies, renderMovies);
    });
  };
}

export default main;

