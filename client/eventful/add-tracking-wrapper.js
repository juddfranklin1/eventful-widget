import React,{Component} from 'react';
import ReactDOM from 'react-dom';

/* The component where we will be able to track new elements or new events */

export default class AddTrackingWrapper extends Component {
  constructor(props){
    super();
    this.state = {}
  }

  render() {
    return (
      <div className={ this.props.activeTab === 'add' ? 'add-wrapper section shown' : 'add-wrapper section hidden' }>
        <h2>Add Tracking</h2>
        <h3>Coming soon... add tracking of specific events and specific elements here.</h3>
      </div>
    );
  };
}