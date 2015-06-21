import Movie from 'js/components/Movie.js!jsx';

import React from 'react';
import keygen from 'js/services/keygen';

const MovieList = React.createClass({
  render: function() {
    const { movies, postersEnabled } = this.props;
    return (
      <ul className="movie-list">
        {movies.map(movie => <Movie movie={movie} postersEnabled={postersEnabled} key={keygen()} />)}
      </ul>
    );
  }
});

export default MovieList;