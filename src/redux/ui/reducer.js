import { cloneDeep, merge } from 'lodash';

import types from '../../constants/actionTypes.constants';

const INITIAL_STATE = { loading: 0 };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.UI_PUT:
			const newState = cloneDeep(state);
			return merge(newState, action.payload);
		case types.UI_START_REQUEST:
			return { ...state, loading: state.loading + 1 };
		case types.UI_STOP_REQUEST:
			return { ...state, loading: Math.max(state.loading - 1, 0) };
		default:
			return state;
	}
};
