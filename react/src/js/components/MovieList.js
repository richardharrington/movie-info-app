import Movie from 'js/components/Movie.js!jsx';

import React from 'react';

const MovieList = React.createClass({
  render: function() {
    const { movies, postersEnabled } = this.props;
    return (
      <ul className="movie-list">
        {movies.map(movie => <Movie movie={movie} postersEnabled={postersEnabled} />)}
      </ul>
    );
  }
});

export default MovieList;