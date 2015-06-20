import Dom from 'js/dom';
import Imdb from 'js/imdb';
import Favorites from 'js/favorites';
import Movie from 'js/components/Movie.js!jsx';
import SearchForm from 'js/components/SearchForm.js!jsx';

import React from 'react';

import sortBy from 'lodash/collection/sortBy';

const renderMovies = movies => {
  const sortedMovies = sortBy(movies, 'Title');
  const postersEnabled = Imdb.isImageDownloadEnabled();

  const movieEls = sortedMovies.map(movie =>
    React.createElement(Movie, { movie, postersEnabled }));

  const movieList = Dom.$(".movie-list");
  Dom.removeChildren(movieList);
  React.render(<div>{movieEls}</div>, movieList);
};

const fetchFullMoviesAndRender = moviesBasicInfo => {
  Imdb.fetchFullMovieRecords(moviesBasicInfo).then(renderMovies);
};

const launchSearchAndRender = (searchStr) => {
  Imdb.searchForMovies(searchStr).then(fetchFullMoviesAndRender);
};

const fetchFavoritesAndRender = () => {
  Favorites.fetch().then(fetchFullMoviesAndRender);
};

const main = (env) => {
  const searchFormContainer = document.querySelector(".search-form-container");
  React.render(<SearchForm submissionCallback={launchSearchAndRender} />, searchFormContainer);

  const fetchFavoritesLink = Dom.$(".fetch-favorites");
  fetchFavoritesLink.onclick = fetchFavoritesAndRender;

  if (env === 'dev') {
    launchSearchAndRender('kangaroo');
  }
}

export default main;
