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

function removeChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function replaceChildren(parent, children) {
  removeChildren(parent);
  children.forEach(function(child) {
    parent.appendChild(child);
  });
}

function movieEl(movie) {
  var el = document.createElement('li');
  var title = document.createTextNode(movie.title);
  el.appendChild(title);
  return el;
}

function renderMovies(movies, parentEl) {
  var movieEls = movies.map(movieEl);
  replaceChildren(parentEl, movieEls);
}

var movieList = document.getElementById("movieList");
getMoviesFromImdb("Star Wars", function(response) {
  var movies = processImdbResponse(response);
  renderMovies(movies, movieList);
});

