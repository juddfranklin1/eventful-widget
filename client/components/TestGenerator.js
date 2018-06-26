import React from 'react';

const TestGenerator = function(props){


    let elementTagText = ' ' + props.elementTag;
        
    if(props.elementTag === 'input'){
        elementTagText = ' ' + props.elementType + elementTagText;
    }

    function onAddElement(sel){// Currently sel is only a class, but it should be more generic.
        let selector = sel || '';

        let TestElement = document.createElement(props.elementTag);
        if(props.elementId && props.elementId !== '')
            TestElement.id = props.elementId;
        if(props.elementClass && props.elementClass !== '')
            TestElement.className = props.elementClass;
        if(typeof props.elementAttributes !== 'undefined' && props.elementAttributes.length > 0)
            props.elementAttributes.forEach(el => TestElement.setAttribute(el.key, el.val || true));
        if(props.elementTag === 'input'){
            const elementType = props.elementType || 'text';
            TestElement.setAttribute('type', elementType);
        }

        if(props.elementTag === 'button'){
            const elementContent = props.elementContent || 'text';
            TestElement.innerHTML = elementContent;
        } else {
            TestElement.innerHTML = 'New' + elementTagText +' Element';
        }


        document.querySelector('body').append(TestElement);
    }

    return(

        <button onClick={ onAddElement.bind(this, props.tagName) }>Add{ elementTagText }</button>
    
    );

}

export default TestGenerator;