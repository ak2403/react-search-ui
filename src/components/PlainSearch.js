import React, { Component } from 'react';

class PlainSearch extends Component {

  constructor(props) {
    super();
    this.state = {
      searchValue: '',
      selectedValue: ''
    };
    this.searchInput = this.searchInput.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.selected = this.selected.bind(this);
  }

  componentWillMount() {

  }

  searchInput(element) {
    this.setState({
      searchValue: element.target.value
    });
  }

  clearSearch(element) {
    debugger
    this.setState({
      searchValue: ''
    });
  }

  selected(value) {
    debugger
    console.log(value)
  }

  render() {
    const { fetchData } = this.props;

    return (
      <div className="plain-search-group">
        <input type='text' onChange={this.searchInput} onBlur={this.clearSearch} />
        <div className="plain-search-result-group">
          {this.state.searchValue ? fetchData.map((element, index) => {
            if (element.title.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1) {
              return <div className="plain-search-result" key={index} onClick={() => this.selected(element)}>
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
