import aTypes from './actionTypes';

export default {
    handleClick: (id) => ({ type: aTypes.HANDLE_CLICK, id }),
    setChild: (id, value) => ({ type: aTypes.SET_CHILD, id, value }),
    setAdult: (id, value) => ({ type: aTypes.SET_ADULT, id, value }),
    fetchState: () => ({ type: aTypes.FETCH_STATE }),
    pushState: () => ({ type: aTypes.PUSH_STATE }),
    startAsync: () => ({ type: aTypes.START_FAKE_ASYNC }),
    resetData: () => ({ type: aTypes.RESET_DATA })
}