import React from 'react';

const MovieTitle = React.createClass({
  render: function() {
    return <h3 className="movie-title">{this.props.title}</h3>;
  }
});

export default MovieTitle;

