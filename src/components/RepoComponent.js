import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addListToRepo, getRepoDetail } from './actions';

class RepoComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            createList: ''
        };
        this.addList = this.addList.bind(this);
    }

    addList() {
        const { repoDetail } = this.props;
        this.props.addListToRepo({
            name: this.state.createList,
            repoName: repoDetail.name
        })
    }

    componentWillMount() {
        this.props.getRepoDetail({
            name: this.props.match.params.id
        })
    }

    render() {
        let list_template = '';
        const { repoDetail } = this.props;

        return (
            <div>
                <h2>{repoDetail.name}</h2>
                <input type="text" onChange={(e) => this.setState({ createList: e.target.value })} />
                <button onClick={this.addList}>Add To List</button>
            </div>
        )
    }
}

const mapStateToProps = (props) => {
    return {
        repoDetail: props.repoProps.repoDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addListToRepo: addListToRepo,
        getRepoDetail: getRepoDetail
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoComponent);