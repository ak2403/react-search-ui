import React, { Component } from 'react';
import PlainSearch from './components/PlainSearch';
import Dashboard from './components/DashBoardComponent';
import ignData from './components/data/ign';

class App extends Component {
  render() {
    return (
      <div className='search-container'>
        <Dashboard />
      </div>
    );
  }
}

export default App;
