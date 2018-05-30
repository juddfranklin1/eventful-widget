import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class TestGenerator extends Component {
    constructor(props) {
        super();
    }

    onAddElement(sel){//Currently sel is only a class, but it should be more generic.
        let selector = sel || '';

        let TestElement = document.createElement('div');

        TestElement.innerHTML = 'New ' + sel +' Element to Click';
        TestElement.className = selector;
        document.querySelector('body').append(TestElement);
    }

    
    render() {

        const element = this.props.elementName;

        return(

            <button onClick={ this.onAddElement.bind(this,this.props.elementName) }>Add { element }</button>
        
        );


    }

}
