import React from 'react';

const SearchForm = React.createClass({
  getInitialState: function() {
    return { text: '' };
  },
  isEnterPressed: function(event) {
    const keyCode = event.which ? event.which : event.keyCode;
    return (keyCode === 13);
  },
  submit: function(text) {
    this.props.submissionCallback(text.trim());
    this.setState({value: ""});
  },
  handleClick: function(event) {
    event.preventDefault();
    this.submit(this.state.value);
  },
  handleChange: function(event) {
    const text = event.target.value;
    if (this.isEnterPressed(event)) {
      this.submit(text);
    }
    else {
      this.setState({value: text});
    }
  },
  render: function() {
    return (
      <div class="search">
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search for movies here" />
        <button type="submit" onClick={this.handleClick}>Go</button>
      </div>
    );
  }
});

export default SearchForm;
