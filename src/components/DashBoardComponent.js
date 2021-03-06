import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRepo, getRepo } from './actions';
import RepoList from './RepoList';
import RepoComponent from './RepoComponent';
import NavBar from './basic/navbar';

class Dashboard extends Component {

  constructor(props) {
    super();
    this.state = {
      inputValue: ''
    };
  }

  componentWillMount() {

  }

  render() {
    const { fetchData } = this.props;

    return (
      <div>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={RepoList} />
            <Route path="/:id" component={RepoComponent} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    ...props
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRepo: getRepo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
