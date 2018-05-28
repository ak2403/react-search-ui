import axios from 'axios';
const initialState = {
    notification: '',
    lists: '',
    repoDetail: ''
};

export default function RepoReducer(state = initialState, action) {
    switch (action.type) {
        case 'createdList':
            return {
                notification: true,
                lists: action.payload.repoLists
            };
        case 'getRepo':
            return {
                ...state,
                lists: action.payload.repoLists
            };
        case 'getRepoDetail':
            return {
                ...state,
                repoDetail: action.payload.repoDetail
            };
        case 'addedListToRepo':
            return {
                ...state,
                repoDetail: action.payload.repoDetail
            };
        default:
            return state;
    }
}