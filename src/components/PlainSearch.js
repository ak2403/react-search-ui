import React, { Component } from 'react';

class PlainSearch extends Component {

  constructor(props) {
    super();
    this.state = {
      searchValue: ''
    };
    this.searchInput = this.searchInput.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillMount() {

  }

  searchInput(element) {
    this.setState({
      searchValue: element.target.value
    });
  }

  clearSearch() {
    this.setState({
      searchValue: ''
    });
  }

  render() {
    const { fetchData } = this.props;

    return (
      <div className="plain-search-group">
        <input type='text' onChange={this.searchInput} onBlur={this.clearSearch} />
        <div className="plain-search-result-group">
          {this.state.searchValue ? fetchData.map(element => {
            if (element.title.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1) {
              return <div className="plain-search-result">
                <div className="result-title">{element.title} <i className="fa fa-star"></i> {element.score}</div>
                <div className="result-genre">Genre: {element.genre}</div>
              </div>
            }
          }) : ''}
        </div>
      </div>
    );
  }
}

export default PlainSearch;
