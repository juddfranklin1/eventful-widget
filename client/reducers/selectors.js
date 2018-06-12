const selectors = (state = [], action) => {
    switch (action.type) {
      case 'ADD_SELECTOR':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            selected: false
          }
        ]
      case 'TOGGLE_SELECTED':
        return state.map(selector =>
          (selector.id === action.id)
            ? { ...selector, selected: !selector.selected }
            : selector
        )
      default:
        return state
    }
  };
  
  export default selectors;