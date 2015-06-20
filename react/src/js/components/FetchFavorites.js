import React from 'react';

const FetchFavorites = React.createClass({
  render: function() {
    return (
      <p className="fetch-favorites" onClick={this.props.onClick}>Fetch Favorites</p>
    );
  }
});

export default FetchFavorites;
