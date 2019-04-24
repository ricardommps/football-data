import { combineReducers } from 'redux';

import footballDataReducer from './footballData/reducer'
import ui from './ui/reducer';

export default combineReducers({
    footballDataReducer,
    ui,
});