import React from 'react';
import keygen from 'js/services/keygen';

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
    const {name, content} = this.props;
    return (
      <tr>
        <td className="field-name">{name}</td>
        <td className="field-content">{content}</td>
      </tr>
    );
  }
});

const MovieInfo = React.createClass({
  render: function() {
    const {movie} = this.props;
    const fields = Object.keys(movie).filter(key => {
      const isFieldInListOfFieldsToDisplay = !!displayMap[key];
      return isFieldInListOfFieldsToDisplay && movie[key] !== 'N/A';
    }).map((key) => ({
      name: displayMap[key],
      content: movie[key]
    }));

    return (
      <table className="movie-info">
        <tbody>
          { fields.map(field => <Field {...field} key={keygen()} />) }
        </tbody>
      </table>
    );
  }
});

export default MovieInfo;
