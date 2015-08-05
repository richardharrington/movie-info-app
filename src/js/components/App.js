import React from 'react';
import sortBy from 'lodash/collection/sortBy';
import csp from 'js-csp';

import Imdb from 'js/services/imdb';
import Favorites from 'js/services/favorites';

import SearchForm from 'js/components/SearchForm';
import FetchFavorites from 'js/components/FetchFavorites';
import MovieList from 'js/components/MovieList';

const App = React.createClass({
  getInitialState: function() {
    return {movies: []};
  },
  updateMovies: function(movies) {
    let self = this;
    csp.go(function*() {
      const sortedMovies = sortBy(movies, 'Title');
      const favoritesIndex = yield Favorites.getIndex();
      const moviesWithFavorites = sortedMovies.map(movie =>
        Object.assign(movie, {initialIsFavorited: favoritesIndex[movie.imdbID]})
      );
      self.setState({movies: moviesWithFavorites});
    });
  },
  fetchMoviesFromSearch: function(searchStr) {
    let self = this;
    csp.go(function*() {
      self.updateMovies(yield Imdb.searchForMovies(searchStr));
    });
  },
  fetchFavorites: function() {
    let self = this;
    csp.go(function*() {
      self.updateMovies(yield Favorites.fetchMovies());
    });
  },
  render: function() {
    return (
      <div className="app">
        <h1>Movie Search</h1>
        <form class="movie-form">
          <SearchForm submissionCallback={this.fetchMoviesFromSearch} />
          <FetchFavorites onClick={this.fetchFavorites} />
        </form>
        <MovieList movies={this.state.movies} postersEnabled={this.props.postersEnabled} />
      </div>
    );
  }
});

export default App;
