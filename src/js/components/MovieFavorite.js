import React from 'react';

const MovieFavorite = React.createClass({
  render: function() {
    const { isFavorited, handleFavoriteClick } = this.props;
    const favoritedText = isFavorited ? "Favorited" : "Favorite?";
    return <span className="favorite-query" onClick={handleFavoriteClick}>{favoritedText}</span>;
  }
});

export default MovieFavorite;
