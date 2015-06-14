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


const fetchFavorites = () => Ajax.get('/favorites');

const storeFavorite = (movie) => {
  const payload = {
    name: movie.Title,
    oid: movie.imdbID
  };
  return Ajax.post('/favorites', payload);
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
      return Dom.el('tr', null, fieldNameEl, fieldContentEl);
    }),

    areImagesAllowed = Imdb.isImageDownloadAllowed(),

    favorite = Dom.el('span', {className: "favorite-query"}, "Favorite?"),
    movieTitle = Dom.el('h3', {className: "movie-title"}, movie.Title),
    movieInfo = Dom.el('table', {className: "movie-info"}, ...fieldEls),
    showPoster = areImagesAllowed && movie.Poster && movie.Poster !== 'N/A',
    movieComponentsTextOnly = [favorite, movieTitle, movieInfo],
    movieComponents = movieComponentsWithPoster(
      movieComponentsTextOnly, movie, areImagesAllowed
    ),
    movieClassName = areImagesAllowed ? "movie" : "movie wide",
    movieEl = Dom.el('li', {className: movieClassName}, ...movieComponents);

  movieEl.onclick = () => Dom.toggleClass(movieEl, 'expand');

  favorite.addEventListener('click', function favoriteEventListener(event) {
    event.stopPropagation();
    favorite.innerHTML = "favorited!";
    Dom.addClass(movieEl, 'favorite');
    storeFavorite(movie).then(() =>
      console.log("Congratulations, you've posted a favorite! (We'll do something more meaningful here in the future.)")
    );
    favorite.removeEventListener('click', favoriteEventListener);
  }, false);

  return movieEl;
}

// Todo: perhaps add more to this or
// another factory function, making the
// renderMovies function not something we
// have to pass all over the place.

const makeMoviesRenderer = (parentEl) =>
  (movies) => {
    // movies = sortBy(movies, 'Title');
    const movieEls = movies.map(movieEl);
    Dom.replaceChildren(parentEl, movieEls);
  }

const searchForMovies = (searchString) =>
  new Promise((resolve, reject) =>
    Imdb.search(searchString).then((response) => {
      const movies = response.Search;
      resolve(movies);
    })
  );

const renderMoviesFromBasicInfo = (moviesBasicInfo, renderMovies) =>
  Imdb.fetchFullMovieRecords(moviesBasicInfo).then(renderMovies);

const launchSearchAndRender = (textInput, renderMovies) => {
  const searchString = textInput.value.trim();
  searchForMovies(searchString).then((movies) =>
    renderMoviesFromBasicInfo(movies, renderMovies));
}

const main = () => {
  const
    submitButton = Dom.$("button[type=submit]"),
    fetchFavoritesLink = Dom.$(".fetch-favorites"),
    textInput = Dom.$("input[name=searchBox]"),
    movieList = Dom.$(".movie-list"),
    renderMovies = makeMoviesRenderer(movieList);

  submitButton.onclick = () => launchSearchAndRender(textInput, renderMovies);

  textInput.onkeypress = (event) => {
    const keyCode = event.which ? event.which : event.keyCode;
    if (keyCode === 13) {
      launchSearchAndRender(textInput, renderMovies);
    }
  };

  fetchFavoritesLink.onclick = () =>
    fetchFavorites().then((movies) =>
      renderMoviesFromBasicInfo(movies, renderMovies));
}

export default main;

