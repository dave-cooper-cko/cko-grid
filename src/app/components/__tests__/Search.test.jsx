import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Search from '../Search';

const setRemoteState = sinon.stub();

describe('Search', () => {
  it('Renders successfully', () => {
    const component = shallow(<Search setRemoteState={setRemoteState} />);

    expect(component.isEmpty()).toBeFalsy();
  });

  it('Sets the correct searchText when text is entered', () => {
    const component = shallow(<Search setRemoteState={setRemoteState} />);

    expect(component.state().searchText).toEqual('');

    const input = component.find('input');
    input.simulate('change', { target: { value: 'dave' } });

    expect(component.state().searchText).toEqual('dave');
  });
});
