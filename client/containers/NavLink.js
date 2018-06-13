import { connect } from 'react-redux';
import { setActiveTab } from '../actions';
import NavLink from '../components/NavLink';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.activeTab
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setActiveTab(ownProps.filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLink);