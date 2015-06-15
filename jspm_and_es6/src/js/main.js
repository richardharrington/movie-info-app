import Dom from 'js/dom';
import Imdb from 'js/imdb';
import Favorites from 'js/favorites';
import movieEl from 'js/movie_el';

import sortBy from 'lodash/collection/sortBy';

const submitButton = Dom.$("button[type=submit]");
const fetchFavoritesLink = Dom.$(".fetch-favorites");
const textInput = Dom.$("input[name=searchBox]");
const movieList = Dom.$(".movie-list");

const extractSearchStr = textInput => textInput.value.trim();

const isEnterPressed = event => {
  const keyCode = event.which ? event.which : event.keyCode;
  return (keyCode === 13);
}

const renderMovies = movies => {
  movies = sortBy(movies, 'Title');
  const movieEls = movies.map(movieEl);
  Dom.replaceChildren(movieList, movieEls);
};

const fetchFullMoviesAndRender = moviesBasicInfo => {
  Imdb.fetchFullMovieRecords(moviesBasicInfo).then(renderMovies);
};

const launchSearchAndRender = () => {
  Imdb.searchForMovies(extractSearchStr(textInput)).then(fetchFullMoviesAndRender);
};

const fetchFavoritesAndRender = () => {
  Favorites.fetch().then(fetchFullMoviesAndRender);
};

const main = () => {
  submitButton.onclick = launchSearchAndRender;
  textInput.onkeypress = event => {
    if (isEnterPressed(event)) launchSearchAndRender();
  };
  fetchFavoritesLink.onclick = fetchFavoritesAndRender;
}

export default main;
