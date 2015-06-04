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
  // Poster: "Poster",
  Metascore: "Metascore",
  imdbRating: "IMDB Rating",
  imdbVotes: "IMDB Votes"
};

function searchImdb(searchString, callback) {
  Ajax.get('http://www.omdbapi.com/?type=movie&s=' + encodeURIComponent(searchString), callback);
}

function fetchFullMovieRecord(oid, callback) {
  Ajax.get('http://www.omdbapi.com/?i=' + oid, callback);
}

function oidsFromSearchResponse(response) {
  var movies = response.Search;
  return movies.map(function(movie) {
    return movie.imdbID;
  });
}

function fetchFullMovieRecords(oids, callback) {
  var counter = oids.length;
  var movies = [];
  oids.forEach(function(oid) {
    fetchFullMovieRecord(oid, function(movie) {
      movies.push(movie);
      counter--;
      if (counter === 0) {
        callback(movies);
      }
    });
  });
}

function movieForFavoriting(movie) {
  return {
    title: movie.Title,
    oid: movie.imdbID
  };
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

  var movieTitle = Dom.el('h3', {className: "movie-title"}, movie.Title)
  var movieInfo = Dom.el('table', {className: "movie-info"}, fieldEls);
  var movieComponents = [movieTitle, movieInfo];
  if (movie.Poster && movie.Poster !== 'N/A') {
    var moviePoster = Dom.el('img', {src: movie.Poster, className: 'movie-poster'});
    movieComponents = movieComponents.concat(moviePoster);
  }
  var movieEl = Dom.el('li', {className: 'movie'}, movieComponents);
  movieEl.onclick = function() {
    if (movieEl.className.indexOf('expand') === -1) {
      movieEl.className = 'movie expand';
    }
    else {
      movieEl.className = 'movie';
    }
  }
  return movieEl;
}

function makeMoviesRenderer(parentEl) {
  return function(movies) {
    var movieEls = movies.map(movieEl);
    Dom.replaceChildren(parentEl, movieEls);
  }
}

function makeItSo() {
  var submitButton = Dom.$("button[type=submit]");
  var textInput = Dom.$("input[name=searchBox]");
  var movieList = Dom.$(".movie-list");
  var renderMovies = makeMoviesRenderer(movieList);

  submitButton.onclick = function() {
    var searchString = textInput.value.trim();
    searchImdb(searchString, function(response) {
      var oids = oidsFromSearchResponse(response);
      fetchFullMovieRecords(oids, renderMovies);
    });
  }
}

makeItSo();


