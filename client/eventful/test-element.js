import React from 'react';
import ReactDOM from 'react-dom';

function TestElement(props){
    let element = props.elementName;
    return(
        <button onClick={ (element) => { props.onClick(props.elementName) } }>Add { element }</button>
    )
}
export default TestElement;