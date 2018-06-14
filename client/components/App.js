import React from 'react';

import Navbar from './Navbar';
import Header from './Header';
import OverviewPanel from './OverviewPanel';
import ManagePanel from '../containers/ManagePanel';
import OptionsPanel from './OptionsPanel';

const App = function(props) {
  let panel;
  switch(props.activeTab){
    case 'overview':
      panel = (<OverviewPanel />);
      break;
    case 'manage':
      panel = (<ManagePanel />);
      break;
    case 'options':
      panel = (<OptionsPanel />);
      break;
    default:
      panel = (<OverviewPanel />);
  }

  return (
    <div className={ 'eventful-content-wrapper ' + props.activeTab }>
      <Navbar activeTab={ props.activeTab } />
      <Header />
      { panel }
    </div>
  );
}

export default App;