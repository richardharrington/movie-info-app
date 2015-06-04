function searchImdb(searchString, callback) {
  Ajax.get('http://www.omdbapi.com/?type=movie&s=' + encodeURIComponent(searchString), callback);
}

function processImdbSearchResponse(response) {
  var movies = response.Search;
  return movies.map(function(movie) {
    return {
      title: movie.Title,
      oid: movie.imdbID
    };
  });
}

function movieEl(movie) {
  return Dom.el('li', null, movie.title);
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
    var searchString = textInput.value.trim();
    searchImdb(searchString, function(response) {
      var movies = processImdbSearchResponse(response);
      renderMovies(movies, movieList);
    });
  }
}

makeItSo();


