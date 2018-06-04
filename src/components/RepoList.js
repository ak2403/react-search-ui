import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo, deleteRepo, addRepo } from './actions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TextField from '@material-ui/core/TextField';

class RepoList extends Component {
    constructor(props) {
        super();
        this.goToRepo = this.goToRepo.bind(this);
        this.deleteRepo = this.deleteRepo.bind(this);
        this.addListGroup = this.addListGroup.bind(this);
    }

    goToRepo(data) {
        this.props.history.push(`/${data}`)
    }

    addListGroup() {
        const { inputValue } = this.state;
        this.props.addRepo({
            name: inputValue
        });
    }

    deleteRepo(data) {
        this.props.deleteRepo(data);
    }

    componentWillMount() {
        this.props.getRepo();
    }

    render() {
        let list_template = '';
        const { lists } = this.props.repoProps;

        if (lists) {
            list_template = lists.map((list, index) => {
                return (<Card style={{ width: '250px', height: '200px', display: 'inline-block', margin: '0 10px' }}>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            {list.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {list.lists.length} items
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'space-between' }}>
                        <Button onClick={() => this.goToRepo(list._id)} size="small" style={{ float: 'left' }}>
                            <PlayArrowIcon />
                        </Button>
                        <Button variant="fab" color="action" aria-label="delete" onClick={() => this.deleteRepo(list)} style={{ float: 'right', height: '20px', width: '35px' }}>
                            <DeleteIcon />
                        </Button>
                    </CardActions>
                </Card>);
            })
        }
        return (
            <div>
                <div className="add_list_layer">
                    <TextField
                        id="addlist"
                        label="Add List"
                        margin="normal"
                        onChange={(e) => this.setState({ inputValue: e.target.value })}
                    />
                    <Button variant="outlined" onClick={this.addListGroup}>
                        Add List
        </Button>
                </div>
                <div class="repos_list">{list_template}</div>
            </div>
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
        getRepo: getRepo,
        deleteRepo: deleteRepo,
        addRepo: addRepo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);