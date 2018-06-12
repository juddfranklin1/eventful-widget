import { combineReducers } from 'redux';
import selectors from './selectors';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    selectors,
    visibilityFilter
})