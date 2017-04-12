import React from 'react';
import ReactDOM from 'react-dom';

function AddElement(props){
    let element = props.elementName;
    return(
        <button onClick={ (element) => { props.onClick(props.elementName) } }>Add { element }</button>
    )
}
export default AddElement;