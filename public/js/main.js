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

function makeSortObjectsByKey(key) {
  var comparator = function(a, b) {
    var valueA = a[key];
    var valueB = b[key];
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  }
  return function(arr) {
    return arr.sort(comparator);
  }
}

var sortByTitle = makeSortObjectsByKey('Title');

function searchImdb(searchString, callback) {
  Ajax.get('http://www.omdbapi.com/?type=movie&s=' +
           encodeURIComponent(searchString), callback);
}

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
  var pairs = Object.keys(movie).filter(function(key) {
    var isFieldInListOfFieldsToDisplay = !!displayMap[key];
    return isFieldInListOfFieldsToDisplay && movie[key] !== 'N/A';
  }).map(function(key) {
    return [displayMap[key], movie[key]];
  });

  var fieldEls = pairs.map(function(pair) {
    var fieldNameEl = Dom.el('td', {className: 'field-name'}, pair[0]);
    var fieldTextEl = Dom.el('td', {className: 'field-description'}, pair[1]);
    return Dom.el('tr', null, [fieldNameEl, fieldTextEl]);
  });

  var favorite = Dom.el('span', {className: "favorite-query"}, "Favorite?");
  var movieTitle = Dom.el('h3', {className: "movie-title"}, movie.Title);
  var movieInfo = Dom.el('table', {className: "movie-info"}, fieldEls);
  var movieComponents = [favorite, movieTitle, movieInfo];
  if (movie.Poster && movie.Poster !== 'N/A') {
    var moviePoster = Dom.el('img', {src: movie.Poster, className: 'movie-poster'});
    movieComponents = movieComponents.concat(moviePoster);
  }
  var movieEl = Dom.el('li', {className: 'movie'}, movieComponents);
  movieEl.onclick = function() {
    Dom.toggleClass(movieEl, 'expand');
  }
  var favoriteEventListener = function(event) {
    event.stopPropagation();
    favorite.innerHTML = "favorited!";
    Dom.addClass(movieEl, 'favorite');
    storeFavorite(movie);
    favorite.removeEventListener('click', favoriteEventListener);
  };
  favorite.addEventListener('click', favoriteEventListener, false);
  return movieEl;
}

function makeMoviesRenderer(parentEl) {
  return function(movies) {
    movies = sortByTitle(movies);
    var movieEls = movies.map(movieEl);
    Dom.replaceChildren(parentEl, movieEls);
  }
}

function makeItSo() {
  var submitButton = Dom.$("button[type=submit]");
  var fetchFavoritesLink = Dom.$(".fetch-favorites");
  var textInput = Dom.$("input[name=searchBox]");
  var movieList = Dom.$(".movie-list");
  var renderMovies = makeMoviesRenderer(movieList);

  submitButton.onclick = function() {
    var searchString = textInput.value.trim();
    searchImdb(searchString, function(response) {
      var movies = response.Search;
      fetchFullMovieRecords(movies, renderMovies);
    });
  }

  fetchFavoritesLink.onclick = function() {
    fetchFavorites(function(movies) {
      fetchFullMovieRecords(movies, renderMovies);
    });
  }

}

makeItSo();


