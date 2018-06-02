import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo } from './actions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                        <Button size="small">Learn More</Button>
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
        getRepo: getRepo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);