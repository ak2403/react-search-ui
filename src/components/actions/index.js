import axios from 'axios';

export const addRepo = (data) => {
    return (dispatch) => {
        axios.post('/repo/addRepo', data).then(res => {
            dispatch({
                type: 'createdList',
                payload: res.data
            })
        });
    }
}

export const getRepo = (data) => {
    return (dispatch) => {
        axios.get('/repo/getRepo').then(res => {
            dispatch({
                type: 'getRepo',
                payload: res.data
            })
        });
    }
}

export const getRepoDetail = (data) => {
    return (dispatch) => {
        axios.post('/repo/getRepoDetail', data).then(res => {
            dispatch({
                type: 'getRepoDetail',
                payload: res.data
            })
        });
    }
}

export const addListToRepo = (data) => {
    return (dispatch) => {
        axios.post('/repo/addListToRepo', data).then(res => {
            dispatch({
                type: 'addedListToRepo',
                payload: res.data
            })
        });
    }
}

export const changeRepoList = (data) => {
    return (dispatch) => {
        axios.post('/repo/changeRepoList', data).then(res => {
            dispatch({
                type: 'addedListToRepo',
                payload: res.data
            });
        });
    }
}