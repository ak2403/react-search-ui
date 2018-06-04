import axios from 'axios';

export const addRepo = (data) => {
    return (dispatch) => {
        axios.post('https://react-search-server.herokuapp.com/repo/addRepo', data).then(res => {
            dispatch({
                type: 'createdList',
                payload: res.data
            })
        });
    }
}

export const getRepo = (data) => {
    return (dispatch) => {
        axios.get('https://react-search-server.herokuapp.com/repo/getRepo').then(res => {
            dispatch({
                type: 'getRepo',
                payload: res.data
            })
        });
    }
}

export const getRepoDetail = (data) => {
    return (dispatch) => {
        axios.post('https://react-search-server.herokuapp.com/repo/getRepoDetail', data).then(res => {
            dispatch({
                type: 'getRepoDetail',
                payload: res.data
            })
        });
    }
}

export const addListToRepo = (data) => {
    return (dispatch) => {
        axios.post('https://react-search-server.herokuapp.com/repo/addListToRepo', data).then(res => {
            dispatch({
                type: 'addedListToRepo',
                payload: res.data
            })
        });
    }
}

export const changeRepoList = (data) => {
    return (dispatch) => {
        axios.post('https://react-search-server.herokuapp.com/repo/changeRepoList', data).then(res => {
            dispatch({
                type: 'addedListToRepo',
                payload: res.data
            });
        });
    }
}

export const changeRepoName = (data) => {
    return (dispatch) => {
        axios.post('https://react-search-server.herokuapp.com/repo/changeRepoName', data).then(res => {
            dispatch({
                type: 'addedListToRepo',
                payload: res.data
            });
        });
    }
}

export const deleteRepo = (data) => {
    return (dispatch) => {
        axios.post('https://react-search-server.herokuapp.com/repo/deleteRepo', data).then(res => {
            dispatch({
                type: 'getRepo',
                payload: res.data
            });
        });
    }
}