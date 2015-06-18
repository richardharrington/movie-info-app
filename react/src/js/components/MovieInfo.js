import React from 'react';

const {table, tbody, tr, td} = React.DOM;

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

const Field = React.createClass({
  render: function() {
    return tr(null,
             td({className: "field-name"}, this.props.name),
             td({className: "field-content"}, this.props.content)
           );
  }
});

const MovieInfo = React.createClass({
  render: function() {
    const movie = this.props.movie;
    const fields = Object.keys(movie).filter(key => {
      const isFieldInListOfFieldsToDisplay = !!displayMap[key];
      return isFieldInListOfFieldsToDisplay && movie[key] !== 'N/A';
    }).map((key) => ({
      name: displayMap[key],
      content: movie[key]
    }));

    return table({className: "movie-info"},
             tbody(null,
               fields.map(field => React.createElement(Field, field))
             )
           );
  }

});

export default MovieInfo;
