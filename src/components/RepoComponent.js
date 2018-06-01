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
            },
            repoDetail: ''
        };
        this.addList = this.addList.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onUpdateQuantity = this.onUpdateQuantity.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentWillReceiveProps(prev, next) {
        if (prev.repoDetail) {
            this.setState({
                repoDetail: prev.repoDetail
            })
        }
    }

    onSearch(event) {
        let { repoDetail } = this.props;
        let repoObject = JSON.parse(JSON.stringify(repoDetail));
        let searchList = _.filter(repoObject.lists, list => {
            if (list.title.toLowerCase().indexOf(event.target.value) != -1)
                return list;
        });
        repoObject.lists = searchList;
        this.setState({
            repoDetail: repoObject,
            createList: event.target.value
        });
    }

    onRemove(element) {
        let { repoDetail } = this.state;
        let updatedDetail = _.without(repoDetail.lists, _.findWhere(repoDetail.lists, {
            title: element.title
        }));
        repoDetail.lists = updatedDetail;
        this.props.changeRepoList(repoDetail);
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
            let { repoDetail } = this.state;
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
            let { repoDetail } = this.state;
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
        let { repoDetail } = this.state;
        _.filter(repoDetail.lists, list => {
            if (list.title == title)
                list.checked = event.target.checked
        });
        this.props.changeRepoList(repoDetail);
    }

    addList() {
        const { repoDetail } = this.state;
        if (repoDetail.lists.length === 0) {
            this.props.addListToRepo({
                name: {
                    title: this.state.createList,
                    checked: false,
                    quantity: 1
                },
                repoName: repoDetail.name
            });
            this.setState({
                createList: ''
            })
        }
    }

    componentWillMount() {
        this.props.getRepoDetail({
            name: this.props.match.params.id
        })
    }

    render() {
        let list_template = [];
        let checkedItems = 0, totalItems = 0;
        const { repoDetail } = this.state;

        if (repoDetail.lists) {
            let { editElem, editQuantity } = this.state;
            totalItems = repoDetail.lists.length;
            list_template = repoDetail.lists.map((list, index) => {
                list.checked && (checkedItems += 1);
                (!list.quantity) && (list.quantity = 1);
                return (<li key={index}>
                    <input type="checkbox" checked={list.checked ? true : false} onChange={(event) => this.checkboxChange(event, list.title)} ref="check" />
                    {editElem.original === list.title ? <input type="text" value={editElem.updated} onChange={(e) => this.onInputChange(e, 'title')} onKeyPress={(event) => this.onUpdate(event)} /> : <span>{list.title}</span>}
                    <i className="fa fa-pencil" onClick={() => this.onEdit(list, 'title')} />
                    {editQuantity.title === list.title ? <input type="text" value={editQuantity.updated} onChange={(e) => this.onInputChange(e, 'quantity')} onKeyPress={(event) => this.onUpdateQuantity(event)} /> : <span>Counts: {list.quantity}</span>}
                    <i className="fa fa-pencil" onClick={() => this.onEdit(list, 'quantity')} />
                    <span style={{ float: 'right' }}><i class="fa fa-times" onClick={() => this.onRemove(list)} /></span>
                </li>)
            })
        }

        const Styles = {
            rootElement: {
                width: '90%',
                margin: '0 auto'
            },
            addListButton: {
                height: '39px'
            },
            headerStyle: {
                textAlign: 'center'
            },
            inputStyle: {
                width: '80%',
                border: '2px solid #e0e0e0',
                height: '25px',
                borderRadius: '5px 0 0 5px',
                padding: '5px 10px'
            }
        }

        return (
            <div style={Styles.rootElement}>
                <span>
                    <Link to="/">Back to Home</Link>
                </span>
                <h2 style={Styles.headerStyle}>{repoDetail.name} <i className="fa fa-pencil" /></h2>
                <div style={{ width: '70%', margin: '0 auto', textAlign: 'center' }}>
                    <input type="text" value={this.state.createList} onChange={(event) => this.onSearch(event)} style={Styles.inputStyle} />
                    <button onClick={this.addList} style={Styles.addListButton}>Add To List</button>
                </div>
                Status: {checkedItems} checked in {totalItems} items
                {list_template.length != 0 ? <ul className="repo_list">{list_template}</ul> : 'No record found'}
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