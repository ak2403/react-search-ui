import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo, deleteRepo } from './actions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

class RepoList extends Component {
    constructor(props) {
        super();
        this.goToRepo = this.goToRepo.bind(this);
        this.deleteRepo = this.deleteRepo.bind(this);
    }

    goToRepo(data) {
        this.props.history.push(`/${data}`)
    }

    deleteRepo(data){
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
                return (<Card>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            {list.name}
          </Typography>
                        <Typography color="textSecondary">
                            adjective
          </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.goToRepo(list._id)} size="small">Learn More</Button>
                        <Button variant="fab" color="action" aria-label="delete" onClick={() => this.deleteRepo(list)} style={{ height: '20px', width: '35px' }}>
                            <DeleteIcon />
                        </Button>
                    </CardActions>
                </Card>);
                // return <li key={index} onClick={() => this.goToRepo(list._id)}>{list.name}</li>
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
        getRepo: getRepo,
        deleteRepo: deleteRepo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);