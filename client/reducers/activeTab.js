import { TabFilters } from '../actions';

const tabFilter = (state = TabFilters.TAB_OVERVIEW, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return action.filter
    default:
      return state
  }
};

export default tabFilter;