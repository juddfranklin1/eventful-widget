import React from 'react';
import ReactDOM from 'react-dom';

const WidgetToggle = function(props){
    let visible = props.hidden ? 'show' : 'hide';
    return(
        <div className="eventful-toggle-tab" onClick={ () => { props.onToggle() } }>
            <a href={ '#' + visible }>{ visible } eventful</a>
        </div>
    );
}

export default WidgetToggle;