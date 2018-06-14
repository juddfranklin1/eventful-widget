let nextSelectorId = 0
export const addSelector = text => ({
  type: 'ADD_SELECTOR',
  payload: {
    id: nextSelectorId++,
    text: text
  }
});

export const setSelectors = arr => ({
  type: 'SET_SELECTORS',
  payload: arr
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleSelected = id => ({
  type: 'TOGGLE_SELECTED',
  id
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SELECTED: 'SHOW_SELECTED',
  SHOW_NEW: 'SHOW_NEW'
};

export const setActiveTab = filter => ({
  type: 'SET_ACTIVE_TAB',
  filter
});

export const TabFilters = {
  TAB_OVERVIEW: 'TAB_OVERVIEW',
  TAB_MANAGE: 'TAB_MANAGE',
  TAB_OPTIONS: 'TAB_OPTIONS'
};