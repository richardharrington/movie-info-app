function getMoviesFromImdb(searchString, callback) {
  Ajax.get('http://www.omdbapi.com/?s=' + encodeURIComponent(searchString), callback);
}

function processImdbResponse(response) {
  var rawRecords = response.Search;
  var movies = rawRecords.filter(function(record) {
    return record.Type = "movie";
  }).map(function(movie) {
    return {
      title: movie.Title,
      oid: movie.imdbID
    };
  });
  return movies;
}

function movieEl(movie) {
  return Dom.textEl('li', movie.title);
}

function renderMovies(movies, parentEl) {
  var movieEls = movies.map(movieEl);
  Dom.replaceChildren(parentEl, movieEls);
}

function makeItSo() {
  var $ = Dom.$;
  var movieList = $("#movieList");
  var submitButton = $("button[type=submit]");
  var textInput = $("input[name=searchBox]")
  submitButton.onclick = function() {
    var searchString = textInput.value;
    getMoviesFromImdb(searchString, function(response) {
      var movies = processImdbResponse(response);
      renderMovies(movies, movieList);
    });
  }
}

makeItSo();


