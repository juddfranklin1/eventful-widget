let nextSelectorId = 0
export const addSelector = text => ({
  type: 'ADD_SELECTOR',
  id: nextSelectorId++,
  text
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