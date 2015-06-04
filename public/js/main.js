var displayMap = {
  Title: "Title",
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
  Poster: "Poster",
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
    var fieldNameEl = Dom.el('span', {className: 'field-name'}, pair[0]);
    var fieldTextEl = Dom.el('span', null, pair[1]);
    return Dom.el('li', null, [fieldNameEl, fieldTextEl]);
  });

  var dataContainer = Dom.el('ul', null, fieldEls);
  return Dom.el('li', null, dataContainer);
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
  var movieList = Dom.$("#movieList");
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


