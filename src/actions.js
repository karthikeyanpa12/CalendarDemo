const axios = require('axios');

function getData() {
    return axios.get('http://localhost:8000/reminders');
}

export function getReminders() {
    return (dispatch) => {
        return getData().then(response =>
            dispatch({
                type: 'FETCH_DATA',
                payload: response.data
            }));
    }
}