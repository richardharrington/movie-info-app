import Dom from 'js/dom';
import Imdb from 'js/imdb';
import Favorites from 'js/favorites';
import MovieList from 'js/components/MovieList.js!jsx';
import SearchForm from 'js/components/SearchForm.js!jsx';

import React from 'react';

import sortBy from 'lodash/collection/sortBy';

const postersEnabled = Imdb.isImageDownloadEnabled();

const renderMovies = movies => {
  const sortedMovies = sortBy(movies, 'Title');
  const movieListContainer = Dom.$(".movie-list-container");
  const movieList = <MovieList movies={sortedMovies} postersEnabled={postersEnabled} />;
  React.render(movieList, movieListContainer);
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
  const searchForm = <SearchForm submissionCallback={launchSearchAndRender} />;
  React.render(searchForm, searchFormContainer);

  const fetchFavoritesLink = Dom.$(".fetch-favorites");
  fetchFavoritesLink.onclick = fetchFavoritesAndRender;

  if (env === 'dev') {
    launchSearchAndRender('kangaroo');
  }
}

export default main;
