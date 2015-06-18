import React from 'react';

const MovieTitle = React.createClass({
  render: function() {
    return React.DOM.h3({className: "movie-title"}, this.props.title);
  }
});

export default MovieTitle;

