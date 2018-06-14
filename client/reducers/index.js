import { combineReducers } from 'redux';
import selectors, * as fromSelectors from './selectors';
import visibilityFilter from './visibilityFilter';
import activeTab from './activeTab';

export default combineReducers({
    selectors,
    visibilityFilter,
    activeTab
});

export const getCurrentPageSelectors = (state, filter) => {
    return fromSelectors.getCurrentPageSelectors(state.selectors, filter);
};