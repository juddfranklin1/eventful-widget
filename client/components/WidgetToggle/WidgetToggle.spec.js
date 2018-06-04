import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import WidgetToggle from './WidgetToggle';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { window } = new JSDOM(`...`);
const { document } = (new JSDOM(`...`)).window;

const wrapper = shallow(<WidgetToggle />)
describe('WidgetToggle Component', () => {
  it('renders show link text', () => {
    const props = wrapper.props();
    if(props.hidden){        
        expect(wrapper.find('a').text()).toEqual('show eventful')
    }else{
        expect(wrapper.find('a').text()).toEqual('hide eventful')
    }
  })
  xit('renders link', () => {
    expect(wrapper.find('a').text()).toEqual('Welcome to my world')
  })
});