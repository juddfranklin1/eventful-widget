import React from 'react';
import PropTypes from 'prop-types';
import GoSettings from 'react-icons/lib/go/settings';
import GoRadioTower from 'react-icons/lib/go/radio-tower';
import GoPlus from 'react-icons/lib/go/plus';
import NavLink from '../containers/NavLink';
import { TabFilters } from '../actions';

const Navbar = ({ activeTab }) => (
    <ul className={ "eventful-navigation " + activeTab }>
      <li id="tracker-link"><NavLink filter={TabFilters.TAB_OVERVIEW}><GoRadioTower /> Overview</NavLink></li>
      <li id="add-link"><NavLink filter={TabFilters.TAB_MANAGE}><GoPlus /> Tracking</NavLink></li>
      <li id="options-link"><NavLink filter={TabFilters.TAB_OPTIONS}><GoSettings /> Options</NavLink></li>
    </ul>
);

Navbar.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Navbar;