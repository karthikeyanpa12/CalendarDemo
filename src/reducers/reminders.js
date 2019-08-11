
const initialState = [];

export default function reminders(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return action.payload;
        default:
            return state;
    }
}