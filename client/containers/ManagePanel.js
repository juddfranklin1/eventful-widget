import { connect } from 'react-redux';
import ManagePanel from '../components/ManagePanel';
import { getCurrentPageSelectors } from '../reducers';

import { selectorObjectToString } from '../lib/display-helpers';

const mapStateToProps = state => ({
    selectors: getCurrentPageSelectors(state, 'all')
});

// const mapDispatchToProps = dispatch => ({
//     setSelection: id => dispatch(setSelection(id))
// });

export default connect(
mapStateToProps
)(ManagePanel);

export const highlightElements = (elObject) => {
    const selector = selectorObjectToString(elObject);
    const elements = document.querySelectorAll(selector);
    elements.forEach(function(val){
        val.classList.toggle('eventful-widget-highlight');
    });
}