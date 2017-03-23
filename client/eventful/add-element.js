import React from 'react';
import ReactDOM from 'react-dom';

function ElementAdder(props){
    return(
        <button onClick={ props.onClick }>Add an Element</button>
    )
}
export default ElementAdder;