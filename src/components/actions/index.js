import axios from 'axios';

export const addList = (data) => {
    return (dispatch) => {
        axios.post('/api/listgroup', data).then(res => {
            debugger
        });
    }
}