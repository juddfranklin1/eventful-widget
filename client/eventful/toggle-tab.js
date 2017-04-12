import React from 'react';
import ReactDOM from 'react-dom';

const ToggleTab = function(props){
    return(
        <div className="eventful-toggle-tab" onClick={ () => { props.onToggle() } }>
            <a href="#">{ props.hidden && 'Show' }{ !props.hidden && 'Hide' } Eventful</a>
        </div>
    );
}

export default ToggleTab;