import Favorites from 'js/services/favorites';

import MovieInfo from 'js/components/MovieInfo.js!jsx';
import MovieFavorite from 'js/components/MovieFavorite.js!jsx';
import MovieTitle from 'js/components/MovieTitle.js!jsx';
import MoviePoster from 'js/components/MoviePoster.js!jsx';

import React from 'react';

const Movie = React.createClass({
  getInitialState: function() {
    return { isExpanded: false, isFavorited: this.props.movie.initialIsFavorited };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({isFavorited: nextProps.movie.initialIsFavorited});
  },
  handleClick: function() {
    this.setState({isExpanded: !this.state.isExpanded});
  },

  handleFavoriteClick: function(event) {
    const { movie } = this.props;
    event.stopPropagation();
    const nextIsFavorited = !this.state.isFavorited;
    this.setState({ isFavorited: nextIsFavorited });

    const action = nextIsFavorited ? "save" : "delete";
    Favorites[action](movie).then(() =>
      console.log(`Congratulations, you've ${action}d a favorite! (We'll do something more meaningful here in the future.)`)
    );
  },

  showPoster: function() {
    const { movie, postersEnabled } = this.props;
    return postersEnabled && movie.Poster && movie.Poster !== 'N/A';
  },
  render: function() {
    const { movie } = this.props;
    const { isExpanded, isFavorited } = this.state;
    const showPoster = this.showPoster();
    const movieClassName = `movie ${showPoster ? "show-poster" : ""}
                                  ${isExpanded ? "expand" : ""}
                                  ${isFavorited ? "favorite" : ""}`;

    return (
      <li className={movieClassName} onClick={this.handleClick}>
        <MovieFavorite isFavorited={isFavorited} handleFavoriteClick={this.handleFavoriteClick} />
        <MovieTitle title={movie.Title} />
        <MovieInfo movie={movie} />
        {showPoster ? (<MoviePoster url={movie.Poster} />) : null}
      </li>
    );
  }
});

export default Movie;
