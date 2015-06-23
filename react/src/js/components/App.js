import React from 'react';
import sortBy from 'lodash/collection/sortBy';

import Imdb from 'js/services/imdb';
import Favorites from 'js/services/favorites';

import SearchForm from 'js/components/SearchForm.js!jsx';
import FetchFavorites from 'js/components/FetchFavorites.js!jsx';
import MovieList from 'js/components/MovieList.js!jsx';

import cachedMovieDetailsForDev from 'js/componentHelpers/cachedMovieDetailsForDev';

const App = React.createClass({
  componentDidMount: function() {
    if (this.props.env === 'development') {
      this.updateMovies(cachedMovieDetailsForDev);
    }
  },
  getInitialState: function() {
    return {movies: []};
  },
  updateMovies: function(movies) {
    const sortedMovies = sortBy(movies, 'Title');
    Favorites.getIndex().then(index => {
      const moviesWithFavorites = sortedMovies.map(movie =>
        Object.assign(movie, {initialIsFavorited: index[movie.imdbID]})
      );
      this.setState({movies: moviesWithFavorites});
    });
  },
  fetchMoviesFromSearch: function(searchStr) {
    Imdb.fetchMoviesFromSearch(searchStr).then(this.updateMovies);
  },
  fetchFavorites: function() {
    Favorites.fetchMovies().then(this.updateMovies);
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
