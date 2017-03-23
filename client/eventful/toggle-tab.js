import React from 'react';
import ReactDOM from 'react-dom';

const ToggleTab = function(props){
    return(
        <div className="eventfulToggleTab" onClick={ () => { props.onToggle() } }>
            <i>Toggle</i>
        </div>
    );
}

export default ToggleTab;