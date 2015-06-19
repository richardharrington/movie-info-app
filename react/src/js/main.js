import Dom from 'js/dom';
import Imdb from 'js/imdb';
import Favorites from 'js/favorites';
import Movie from 'js/components/Movie.js!jsx';

import React from 'react';

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
  const sortedMovies = sortBy(movies, 'Title');
  const postersEnabled = Imdb.isImageDownloadEnabled();

  const movieEls = sortedMovies.map(movie =>
    React.createElement(Movie, { movie, postersEnabled }));

  Dom.removeChildren(movieList);
  React.render(React.DOM.div(null, movieEls), movieList);
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

const main = (env) => {
  submitButton.onclick = launchSearchAndRender;
  textInput.onkeypress = event => {
    if (isEnterPressed(event)) launchSearchAndRender();
  };
  fetchFavoritesLink.onclick = fetchFavoritesAndRender;

  if (env === 'dev') {
    textInput.value = 'kangaroo';
    launchSearchAndRender();
  }
}

export default main;
