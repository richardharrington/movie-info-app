import React from 'react';

const MoviePoster = React.createClass({
  render: function() {
    return <img className="movie-poster" src={this.props.url} />;
  }
});

export default MoviePoster;

