import React from 'react';
import ReactDOM from 'react-dom';

const ToggleTab = function(props){
    return(
        <div className="eventfulToggleTab" onClick={ () => { props.onToggle() } }>
            <a href="#">Toggle</a>
        </div>
    );
}

export default ToggleTab;