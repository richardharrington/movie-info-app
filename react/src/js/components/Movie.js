import Favorites from 'js/Favorites';

import MovieInfo from 'js/components/MovieInfo';
import MovieFavorite from 'js/components/MovieFavorite';
import MovieTitle from 'js/components/MovieTitle';
import MoviePoster from 'js/components/MoviePoster';

import React from 'react';

const Movie = React.createClass({
  getInitialState: function() {
    return { isExpanded: false, isFavorited: false };
  },
  handleClick: function() {
    this.setState({isExpanded: !this.state.isExpanded});
  },

  handleFavoriteClick: function(event) {
    const { movie } = this.props;
    event.stopPropagation();
    this.setState({ isFavorited: true });
    Favorites.store(movie).then(() =>
      console.log("Congratulations, you've posted a favorite! (We'll do something more meaningful here in the future.)")
    );
  },

  showPoster: function() {
    const { movie, postersEnabled } = this.props;
    if (movie.Poster === 'N/A') console.log('N/A');
    return postersEnabled && movie.Poster && movie.Poster !== 'N/A';
  },
  render: function() {
    const { movie } = this.props;
    const { isExpanded, isFavorited } = this.state;
    const showPoster = this.showPoster();
    const handleFavoriteClick = isFavorited ? null : this.handleFavoriteClick;

    const movieComponents = [
      React.createElement(MovieFavorite, {isFavorited, handleFavoriteClick}),
      React.createElement(MovieTitle, {title: movie.Title}),
      React.createElement(MovieInfo, {movie})
    ].concat(showPoster ? [React.createElement(MoviePoster, {url: movie.Poster})] : []);

    const movieClassName = "movie" +
                           (showPoster ? " show-poster" : "") +
                           (isExpanded ? " expand" : "") +
                           (isFavorited ? " favorite" : "");

    return React.DOM.li({className: movieClassName, onClick: this.handleClick}, movieComponents);

  }
});

export default Movie;
