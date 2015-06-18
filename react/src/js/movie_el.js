import Dom from 'js/dom';
import Imdb from 'js/imdb';
import Favorites from 'js/favorites';

import keygen from 'js/keygen';

import React from 'react';

var {Component} = React;

const displayMap = {
  Year: "Year",
  Rated: "Rated",
  Released: "Released",
  Runtime: "Runtime",
  Genre: "Genre",
  Director: "Director",
  Writer: "Writer",
  Actors: "Actors",
  Plot: "Plot",
  Language: "Language",
  Country: "Country",
  Awards: "Awards",
  Metascore: "Metascore",
  imdbRating: "IMDB Rating",
  imdbVotes: "IMDB Votes"
};

const {div, ul, li, table, tbody, tr, td, span, h3, img} = React.DOM;
const el = React.createElement;

const FieldEl = React.createClass({
  render: function() {
    return tr(null,
             td({className: "field-name"}, this.props.name),
             td({className: "field-content"}, this.props.content)
           );
  }
});

const FavoriteEl = React.createClass({
  getInitialState: function() {
    return { isFavorited: false };
  },
  handleClick: function(event) {
    event.stopPropagation();
    this.setState({ isFavorited: true });
    Favorites.store(this.props.movie).then(() =>
      console.log("Congratulations, you've posted a favorite! (We'll do something more meaningful here in the future.)")
    );
    event.target.removeEventListener('click', this.handleClick);
  },
  render: function() {
    const favoritedText = this.state.isFavorited ? "Favorited" : "Favorite?";
    const favoritedClass = `favorite-query${this.state.isFavorited ? " favorite" : ""}`;
    return span({className: favoritedClass, onClick: this.handleClick}, favoritedText);
  }
});

const MovieTitleEl = React.createClass({
  render: function() {
    return h3({className: "movie-title"}, this.props.title);
  }
});

const MovieInfoEl = React.createClass({
  render: function() {
    const movie = this.props.movie;
    const fields = Object.keys(movie).filter(key => {
      const isFieldInListOfFieldsToDisplay = !!displayMap[key];
      return isFieldInListOfFieldsToDisplay && movie[key] !== 'N/A';
    }).map((key) => ({
      name: displayMap[key],
      content: movie[key],
      key: keygen()
    }));

    return table({className: "movie-info"},
             tbody(null,
               fields.map(field => el(FieldEl, field))
             )
           );
  }

});

const MoviePosterEl = React.createClass({
  render: function() {
    return img({className: "movie-poster", src: this.props.url});
  }
});

const movieComponentsMaybeWithPoster = (movieComponentEls, movie, areImagesAllowed) => {
  const showPoster = areImagesAllowed && movie.Poster && movie.Poster !== 'N/A';
  if (showPoster) {
    var moviePosterEl = el(MoviePosterEl, {url: movie.Poster});
    return movieComponentEls.concat(moviePosterEl);
  }
  return movieComponentEls;
}

const MovieEl = React.createClass({
  getInitialState: function() {
    return { isExpanded: false };
  },
  handleClick: function() {
    this.setState({isExpanded: !this.state.isExpanded});
  },
  render: function() {
    const { movie } = this.props;
    const areImagesAllowed = Imdb.isImageDownloadAllowed();

    const movieComponentsTextOnly = [
      el(FavoriteEl, {movie}),
      el(MovieTitleEl, {title: movie.Title}),
      el(MovieInfoEl, {movie})
    ];
    const movieComponents = movieComponentsMaybeWithPoster(movieComponentsTextOnly, movie, areImagesAllowed);
    const movieClassName = "movie" + (areImagesAllowed ? "" : " wide") + (this.state.isExpanded ? " expand" : "");

    return li({className: movieClassName, onClick: this.handleClick}, movieComponents);

  }
});

export default MovieEl;
