import footballDataService from '../../api/footballData'
import types from '../../constants/actionTypes.constants';


export const getCompetitions= (
    code,
    season,
    service = footballDataService
) => dispatch =>
        service
            .competitions(code,season)
            .then(data =>
                dispatch({
                    type: types.LOAD_COMPETITIONS,
                    payload: data
                })
            );
