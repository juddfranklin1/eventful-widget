import { connect } from 'react-redux';
import { toggleSelected } from '../actions';
import SelectorList from '../components/SelectorList';
import { VisibilityFilters } from '../actions';

const getVisibleSelectors = (selectors, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return selectors
    case VisibilityFilters.SHOW_SELECTED:
      return selectors.filter(t => t.selected)
    case VisibilityFilters.SHOW_ACTIVE:
      return selectors.filter(t => !t.selected)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = state => ({
  selectors: getVisibleSelectors(state.selectors, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
  toggleSelected: id => dispatch(toggleSelected(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectorList);