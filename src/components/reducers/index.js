import { combineReducers } from 'redux';
import RepoReducer from './repoReducer';

const reducers = combineReducers({
    repoProps: RepoReducer
});

export default reducers;