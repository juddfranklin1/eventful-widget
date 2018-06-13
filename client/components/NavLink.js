import React from 'react';
import PropTypes from 'prop-types';

const NavLink = ({ active, children, onClick }) => (
  <a
     onClick={ onClick }
     style={{
         marginLeft: '4px',
     }}
  >
    {children}
  </a>
);

NavLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavLink;