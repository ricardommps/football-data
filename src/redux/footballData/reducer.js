import types from '../../constants/actionTypes.constants';

const INITIAL_STATE = {
	competitions: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_COMPETITIONS:
        console.log(">>>>LOAD_COMPETITIONS")
        return {
            ...state,
            competitions: action.payload,
        };
        default:
            return state
    }
}