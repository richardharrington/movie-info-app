import React from 'react';
import sortBy from 'lodash/collection/sortBy';

import Imdb from 'js/imdb';
import Favorites from 'js/favorites';

import SearchForm from 'js/components/SearchForm.js!jsx';
import FetchFavorites from 'js/components/FetchFavorites.js!jsx';
import MovieList from 'js/components/MovieList.js!jsx';

const App = React.createClass({
  componentDidMount: function() {
    if (this.props.env === 'dev') {
      this.launchSearch('kangaroo');
    }
  },
  getInitialState: function() {
    return {movies: []};
  },
  updateMovies: function(movies) {
    const sortedMovies = sortBy(movies, 'Title');
    this.setState({movies: sortedMovies});
  },
  fetchMovies: function(movieIds) {
    Imdb.fetchMovies(movieIds).then(this.updateMovies);
  },
  launchSearch: function(searchStr) {
    Imdb.searchForMovies(searchStr).then(this.fetchMovies);
  },
  fetchFavorites: function() {
    Favorites.fetch().then(this.fetchMovies);
  },
  render: function() {
    return (
      <div className="app">
        <h1>Movie Search</h1>
        <form class="movie-form">
          <SearchForm submissionCallback={this.launchSearch} />
          <FetchFavorites onClick={this.fetchFavorites} />
        </form>
        <MovieList movies={this.state.movies} postersEnabled={this.props.postersEnabled} />
      </div>
    );
  }
});

export default App;
