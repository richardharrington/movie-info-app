import React from 'react';

const MovieFavorite = React.createClass({
  render: function() {
    const { isFavorited, handleFavoriteClick } = this.props;
    const favoritedText = isFavorited ? "Favorited" : "Favorite?";
    const favoritedClass = `favorite-query${isFavorited ? " favorite" : ""}`;
    return React.DOM.span({onClick: handleFavoriteClick, className: favoritedClass}, favoritedText);
  }
});

export default MovieFavorite;
