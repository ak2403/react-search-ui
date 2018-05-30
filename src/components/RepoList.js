import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo } from './actions';

class RepoList extends Component {
    constructor(props) {
        super();
        this.goToRepo = this.goToRepo.bind(this);
    }

    goToRepo(data) {
        this.props.history.push(`/${data}`)
    }

    componentWillMount() {
        this.props.getRepo();
    }

    render() {
        let list_template = '';
        const { lists } = this.props.repoProps;

        if (lists) {
            list_template = lists.map((list, index) => {
                return <li key={index} onClick={() => this.goToRepo(list.name)}>{list.name}</li>
            })
        }
        return (
            <ul class="repos_list">{list_template}</ul>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);