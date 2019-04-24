import { _axios } from "./axiosConfig";

import * as constants from './constants';

const BASE_URL = `${constants.REACT_APP_API_BACKEND}`;
const AUTH_TOKEN = `${constants.REACT_APP_X_Auth_Token}`;

class FootballDataService {
    competitions(code,season) {
        console.log("<<<FootballDataService")
        return  _axios
            .get(`/${code}/standings?season=${season}`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}

export default new FootballDataService();