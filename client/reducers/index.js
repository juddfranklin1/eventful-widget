import { combineReducers } from 'redux';
import selectors from './selectors';
import visibilityFilter from './visibilityFilter';
import activeTab from './activeTab';

export default combineReducers({
    selectors,
    visibilityFilter,
    activeTab
})