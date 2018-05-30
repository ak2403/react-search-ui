import React, { Component } from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addListToRepo, getRepoDetail, changeRepoList } from './actions';

class RepoComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            createList: ''
        };
        this.addList = this.addList.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
    }

    checkboxChange(event, title) {
        let { repoDetail } = this.props;
        _.filter(repoDetail.lists, list => {
            if (list.title == title)
                list.checked = event.target.checked
        });
        this.props.changeRepoList(repoDetail);
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

        if (repoDetail.lists) {
            list_template = repoDetail.lists.map((list, index) => {
                return <li key={index}><input type="checkbox" checked={list.checked ? true : false} onChange={(event) => this.checkboxChange(event, list.title)} ref="check" />{list.title} <span style={{ float: 'right' }}>Edit Remove</span></li>
            })
        }

        return (
            <div style={{ width: '90%', margin: '0 auto' }}>
                <span>
                    <Link to="/">Back to Home</Link>
                </span>
                <h2>{repoDetail.name}</h2>
                <ul className="repo_list">{list_template}</ul>
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
        getRepoDetail: getRepoDetail,
        changeRepoList: changeRepoList
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoComponent);