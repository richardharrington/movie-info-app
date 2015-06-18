import React from 'react';

const MoviePoster = React.createClass({
  render: function() {
    return React.DOM.img({className: "movie-poster", src: this.props.url});
  }
});

export default MoviePoster;

