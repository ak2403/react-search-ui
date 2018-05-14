import React, { Component } from 'react';
import PlainSearch from './components/PlainSearch';
import ignData from './components/data/ign';

class App extends Component {
  render() {
    return (
      <div className='search-container'>
        <PlainSearch fetchData={ignData} />
      </div>
    );
  }
}

export default App;
