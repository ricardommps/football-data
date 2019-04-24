export const createGetSelector = (state, ...params) => {
	let obj = state.ui || {};
	let ok = true;

	(params || []).forEach(p => {
		if (!ok) {
			return;
		}

		if (obj && obj[p]) {
			obj = obj[p];
		} else {
			ok = false;
		}
	});

	return key => obj[key];
};

export const getLoading = state => state.ui.loading > 0;
