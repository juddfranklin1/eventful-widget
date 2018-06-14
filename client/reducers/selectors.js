const selectors = (state = [], action) => {
    switch (action.type) {
      case 'ADD_SELECTOR':
        return [
          ...state,
          {
            id: action.payload.id,
            text: action.payload.text,
            selected: false
          }
        ];
      case 'TOGGLE_SELECTED':
        return state.map(selector =>
          (selector.id === action.id)
            ? { ...selector, selected: !selector.selected }
            : selector
        );
      case 'SET_SELECTORS':
        return action.payload
      default:
        return state
    }
  };
  
  export default selectors;


  /** 
   * The Redux convention is to call this kind of function a 'selector';
   * the function name refers to css-like selectors scraped from the page.
   */

  export const getCurrentPageSelectors = (state, filter) => {
    switch (filter) {
      case 'all':
        return state;
      case 'selected':
        return state.filter(el => el.selected);
      case 'unselected':
        return state.filter(el => !el.selected);
    }
  }