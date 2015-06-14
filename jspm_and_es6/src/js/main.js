import Dom from 'js/dom';
import Ajax from 'js/ajax';
import Imdb from 'js/imdb';

const displayMap = {
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


const fetchFavorites = (callback) => Ajax.get('/favorites', callback);

const storeFavorite = (movie) => {
  const payload = {
    name: movie.Title,
    oid: movie.imdbID
  };
  Ajax.post('/favorites', payload);
}

const movieComponentsWithPoster = (movieComponentEls, movie, areImagesAllowed) => {
  const showPoster = areImagesAllowed && movie.Poster && movie.Poster !== 'N/A';
  if (showPoster) {
    const moviePoster = Dom.el('img', {src: movie.Poster, className: 'movie-poster'});
    return movieComponentEls.concat(moviePoster);
  }
  return movieComponentEls;
}

const movieEl = (movie) => {
  const
    fields = Object.keys(movie).filter((key) => {
      const isFieldInListOfFieldsToDisplay = !!displayMap[key];
      return isFieldInListOfFieldsToDisplay && movie[key] !== 'N/A';
    }).map((key) => ({
      name: displayMap[key],
      content: movie[key]
    })),

    fieldEls = fields.map((field) => {
      const fieldNameEl = Dom.el('td', {className: 'field-name'}, field.name);
      const fieldContentEl = Dom.el('td', {className: 'field-content'}, field.content);
      return Dom.el('tr', null, [fieldNameEl, fieldContentEl]);
    }),

    areImagesAllowed = Imdb.isImageDownloadAllowed(),

    favorite = Dom.el('span', {className: "favorite-query"}, "Favorite?"),
    movieTitle = Dom.el('h3', {className: "movie-title"}, movie.Title),
    movieInfo = Dom.el('table', {className: "movie-info"}, fieldEls),
    showPoster = areImagesAllowed && movie.Poster && movie.Poster !== 'N/A',
    movieComponentsTextOnly = [favorite, movieTitle, movieInfo],
    movieComponents = movieComponentsWithPoster(
      movieComponentsTextOnly, movie, areImagesAllowed
    ),
    movieClassName = areImagesAllowed ? "movie" : "movie wide",
    movieEl = Dom.el('li', {className: movieClassName}, movieComponents);

  movieEl.onclick = () => Dom.toggleClass(movieEl, 'expand');

  favorite.addEventListener('click', function favoriteEventListener(event) {
    event.stopPropagation();
    favorite.innerHTML = "favorited!";
    Dom.addClass(movieEl, 'favorite');
    storeFavorite(movie);
    favorite.removeEventListener('click', favoriteEventListener);
  }, false);

  return movieEl;
}

const makeMoviesRenderer = (parentEl) =>
  (movies) => {
    // movies = sortBy(movies, 'Title');
    const movieEls = movies.map(movieEl);
    Dom.replaceChildren(parentEl, movieEls);
  }

const launchSearch = (textInput, callback) => {
  const searchString = textInput.value.trim();
  Imdb.search(searchString, (response) => {
    const movies = response.Search;
    Imdb.fetchFullMovieRecords(movies, callback);
  });
}

const main = () => {
  const
    submitButton = Dom.$("button[type=submit]"),
    fetchFavoritesLink = Dom.$(".fetch-favorites"),
    textInput = Dom.$("input[name=searchBox]"),
    movieList = Dom.$(".movie-list"),
    renderMovies = makeMoviesRenderer(movieList);

  submitButton.onclick = () =>
    launchSearch(textInput, renderMovies);

  textInput.onkeypress = (event) => {
    const keyCode = event.which ? event.which : event.keyCode;
    if (keyCode === 13) {
      launchSearch(textInput, renderMovies);
    }
  };

  fetchFavoritesLink.onclick = () => {
    const fetchFull = (movies) => Imdb.fetchFullMovieRecords(movies, renderMovies);
    fetchFavorites(fetchFull);
  };
}

export default main;

