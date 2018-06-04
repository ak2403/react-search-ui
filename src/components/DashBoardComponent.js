import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRepo, getRepo } from './actions';
import RepoList from './RepoList';
import RepoComponent from './RepoComponent';
import NavBar from './basic/navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {

  constructor(props) {
    super();
    this.state = {
      inputValue: ''
    };
    this.addListGroup = this.addListGroup.bind(this);
  }

  componentWillMount() {

  }

  addListGroup() {
    const { inputValue } = this.state;
    this.props.addRepo({
      name: inputValue
    });
  }

  render() {
    const { fetchData } = this.props;

    return (
      <div>
        <NavBar />
        <TextField
          id="addlist"
          label="Add List"
          margin="normal"
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
        <Button variant="outlined" onClick={this.addListGroup}>
          Add List
        </Button>
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
    addRepo: addRepo,
    getRepo: getRepo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
