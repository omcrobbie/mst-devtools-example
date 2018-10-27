import aTypes from './actionTypes';

export default {
    handleClick: (id) => ({ type: aTypes.HANDLE_CLICK, id }),
    setChild: (id, value) => ({ type: aTypes.SET_CHILD, id, value }),
    setAdult: (id, value) => ({ type: aTypes.SET_ADULT, id, value }),
    hydrate: () => ({ type: aTypes.HYDRATE_STATE}),
    dehydrate: () => ({ type: aTypes.DEHYDRATE_STATE}),
    startAsync: () => ({ type: aTypes.START_FAKE_ASYNC})
}