import types from '../../constants/actionTypes.constants';


export const createPutAction = (...params) => {
	return (key, value) => {
		const rootObj = {};
		let obj = rootObj;

		(params || []).forEach(p => {
			obj[p] = {};
			obj = obj[p];
		});

		obj[key] = value;
		return {
			type: types.UI_PUT,
			payload: rootObj
		};
	};
};

export const startRequest = () => ({
	type: types.UI_START_REQUEST
});

export const stopRequest = () => ({
	type: types.UI_STOP_REQUEST
});
