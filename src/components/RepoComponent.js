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
            createList: '',
            editElem: {
                original: '',
                updated: ''
            },
            editQuantity: {
                original: '',
                updated: ''
            }
        };
        this.addList = this.addList.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onUpdateQuantity = this.onUpdateQuantity.bind(this);
    }

    onInputChange(event, type) {
        if (type === 'title') {
            let { editElem } = this.state;
            editElem.updated = event.target.value;
            this.setState({
                editElem: editElem
            })
        } else {
            let { editQuantity } = this.state;
            editQuantity.updated = event.target.value;
            this.setState({
                editQuantity: editQuantity
            })
        }
    }

    onUpdate(event) {
        if (event.key === 'Enter') {
            let { repoDetail } = this.props;
            _.filter(repoDetail.lists, list => {
                if (list.title === this.state.editElem.original)
                    list.title = this.state.editElem.updated
            })
            this.setState({
                editElem: {
                    original: '',
                    updated: ''
                }
            })
            this.props.changeRepoList(repoDetail);
        }
    }

    onUpdateQuantity(event) {
        if (event.key === 'Enter') {
            let { repoDetail } = this.props;
            _.filter(repoDetail.lists, list => {
                if (list.title === this.state.editQuantity.title)
                    list.quantity = this.state.editQuantity.updated
            })
            this.setState({
                editQuantity: {
                    title: '',
                    updated: ''
                }
            })
            this.props.changeRepoList(repoDetail);
        }
    }

    onEdit(list, type) {
        if (type === 'title') {
            this.setState({
                editElem: {
                    original: list.title,
                    updated: list.title
                }
            })
        } else {
            this.setState({
                editQuantity: {
                    title: list.title,
                    updated: list.quantity
                }
            })
        }
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
            let { editElem, editQuantity } = this.state;
            list_template = repoDetail.lists.map((list, index) => {
                (!list.quantity) && (list.quantity = 1);
                return (<li key={index}>
                    <input type="checkbox" checked={list.checked ? true : false} onChange={(event) => this.checkboxChange(event, list.title)} ref="check" />
                    {editElem.original === list.title ? <input type="text" value={editElem.updated} onChange={(e) => this.onInputChange(e, 'quantity')} onKeyPress={(event) => this.onUpdate(event)} /> : <span>{list.title}</span>}
                    <i className="fa fa-pencil" onClick={() => this.onEdit(list, 'title')} />
                    {editQuantity.title === list.title ? <input type="text" value={editQuantity.updated} onChange={(e) => this.onInputChange(e, 'quantity')} onKeyPress={(event) => this.onUpdateQuantity(event)} /> : <span>Counts: {list.quantity}</span>}
                    <i className="fa fa-pencil" onClick={() => this.onEdit(list, 'quantity')} />
                    <span style={{ float: 'right' }}> Remove</span>
                </li>)
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