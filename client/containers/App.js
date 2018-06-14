import { connect } from 'react-redux';
import { setActiveTab, TabFilters } from '../actions';
import { getCurrentPageSelectors } from '../reducers';

import App from '../components/App';

const getActiveTab = (filter) => {
  switch (filter) {
    case TabFilters.TAB_OVERVIEW:
      return 'overview';
    case TabFilters.TAB_MANAGE:
      return 'manage';
    case TabFilters.TAB_OPTIONS:
      return 'options';
    default:
      throw new Error('Unknown tab filter: ' + filter)
  }
};

const mapStateToProps = state => ({
    activeTab: getActiveTab(state.activeTab),
    selectors: getCurrentPageSelectors(state, 'all')
});

const mapDispatchToProps = dispatch => ({
    setActiveTab: id => dispatch(setActiveTab(id))
});

export default connect(
mapStateToProps,
mapDispatchToProps
)(App);
