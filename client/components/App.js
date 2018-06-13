import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setActiveTab } from '../actions';
import { TabFilters } from '../actions';

import Navbar from './Navbar';
import Header from './Header';
import OverviewPanel from './OverviewPanel';
import ManagePanel from './ManagePanel';
import OptionsPanel from './OptionsPanel';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeTab: 'overview'
    }
  }

  

  componentWillMount() {

  }

  render(){
    let panel;
    switch(this.props.activeTab){
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
      <div className={ 'eventful-content-wrapper ' + this.props.activeTab }>
       <Navbar activeTab={ this.props.activeTab } />
       <Header />
        { panel }
      </div>
    );
  }
}

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
  activeTab: getActiveTab(state.activeTab)
});

const mapDispatchToProps = dispatch => ({
    setActiveTab: id => dispatch(setActiveTab(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);