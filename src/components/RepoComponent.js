import React, { Component } from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addListToRepo, getRepoDetail, changeRepoList, changeRepoName } from './actions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            repoDetail: '',
            editTitle: false
        };
        this.addList = this.addList.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onUpdateQuantity = this.onUpdateQuantity.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.changeHeader = this.changeHeader.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.reduceQuantity = this.reduceQuantity.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
    }

    reduceQuantity(list) {
        let { lists } = this.props.repoDetail;
        _.find(lists, (repo) => {
            if (repo.title === list.title) {
                (repo.quantity > 0) && (repo.quantity -= 1);
                return true;
            }
        })
        this.props.changeRepoList(this.props.repoDetail);
    }

    addQuantity(list) {
        let { lists } = this.props.repoDetail;
        _.find(lists, (repo) => {
            if (repo.title === list.title) {
                repo.quantity += 1;
                return true;
            }
        })
        this.props.changeRepoList(this.props.repoDetail);
    }

    changeTitle(event) {
        if (event.which == 13) {
            let { repoDetail } = this.state;
            repoDetail.rename = event.target.value;
            this.props.changeRepoName(repoDetail);
        }
    }

    changeHeader(e) {
        this.setState({
            editTitle: true
        })
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
            if (list.title.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1)
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
            _id: this.props.match.params.id
        })
    }

    render() {
        let list_template = [];
        let checkedItems = 0, totalItems = 0;
        const { repoDetail } = this.state;

        if (repoDetail.lists) {
            let { editElem, editQuantity } = this.state;
            totalItems = repoDetail.lists.length;
            list_template = <List>
                {repoDetail.lists.map(value => {
                    value.checked && (checkedItems += 1);
                    (!value.quantity) && (value.quantity = 1);
                    return (
                        <ListItem
                            key={value.title}
                            role={undefined}
                            dense
                            button
                        >
                            <Checkbox
                                checked={value.checked}
                                tabIndex={-1}
                                disableRipple
                                onChange={(event) => this.checkboxChange(event, value.title)}
                            />
                            <ListItemText primary={value.title} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.reduceQuantity(value)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z" /></svg>
                                </IconButton>
                                {value.quantity}
                                <IconButton onClick={() => this.addQuantity(value)}>
                                    <AddIcon />
                                </IconButton>

                                <IconButton aria-label="Delete" onClick={() => this.onRemove(value)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                }
                )}
            </List>
            //     return (<li key={index}>
            //         {editElem.original === list.title ? <input type="text" value={editElem.updated} onChange={(e) => this.onInputChange(e, 'title')} onKeyPress={(event) => this.onUpdate(event)} /> : <span>{list.title}</span>}
            //         <i className="fa fa-pencil" onClick={() => this.onEdit(list, 'title')} />
            //         {editQuantity.title === list.title ? <input type="text" value={editQuantity.updated} onChange={(e) => this.onInputChange(e, 'quantity')} onKeyPress={(event) => this.onUpdateQuantity(event)} /> : <span>Counts: {list.quantity}</span>}
            //         <i className="fa fa-pencil" onClick={() => this.onEdit(list, 'quantity')} />
            //     </li>)
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
                {repoDetail ? <div>
                    <h2 style={Styles.headerStyle}>
                        {this.state.editTitle ?
                            <Input
                                defaultValue={repoDetail.name}
                                onKeyDown={(event) => this.changeTitle(event)}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            : <span onDoubleClick={this.changeHeader}>{repoDetail.name}</span>}
                    </h2>
                    <div style={{ width: '70%', margin: '0 auto', textAlign: 'center' }}>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="search"
                                label="search and add items"
                                value={this.state.createList}
                                onChange={(event) => this.onSearch(event)}
                                margin="normal"
                            />
                            <Button variant="fab" color="primary" aria-label="add" onClick={this.addList} style={{ height: '20px', width: '35px' }}>
                                <AddIcon />
                            </Button>
                        </form>
                    </div>
                    Status: {checkedItems} checked in {totalItems} items
                {list_template.length != 0 ? <div>{list_template}</div> : 'No record found'}
                </div> :
                    <div style={{ width: '100%' }}>
                        <CircularProgress />
                    </div>
                }
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
        changeRepoList: changeRepoList,
        changeRepoName: changeRepoName
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoComponent);