import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Pagination from '../Pagination';

const setRemoteState = sinon.stub();

describe('Pagination', () => {
  it('Renders successfully', () => {
    const component = shallow(
      <Pagination
        setRemoteState={setRemoteState}
        totalRows={20}
      />
    );

    expect(component.isEmpty()).toBeFalsy();
  });

  it('Allows the user to navigate back through previous pages of results', () => {
    const component = shallow(
      <Pagination
        setRemoteState={setRemoteState}
        totalRows={20}
      />
    );

    component.setState({ currentPage: 3 });

    const previousPage = component.find('.previousPage');

    expect(component.state().currentPage).toEqual(3);

    previousPage.simulate('click');
    expect(component.state().currentPage).toEqual(2);

    previousPage.simulate('click');
    expect(component.state().currentPage).toEqual(1);

    previousPage.simulate('click');
    expect(component.state().currentPage).toEqual(1);
  });

  it('Allows the user to navigate forward through pages of results', () => {
    const component = shallow(
      <Pagination
        setRemoteState={setRemoteState}
        totalRows={31}
      />
    );

    expect(component.state().currentPage).toEqual(1);
    expect(component.state().resultsPerPage).toEqual(10);

    const nextPage = component.find('.nextPage');

    nextPage.simulate('click');
    expect(component.state().currentPage).toEqual(2);

    nextPage.simulate('click');
    expect(component.state().currentPage).toEqual(3);

    nextPage.simulate('click');
    expect(component.state().currentPage).toEqual(4);

    nextPage.simulate('click');
    expect(component.state().currentPage).toEqual(4);
  });

  it('Allows the user to change the number of results per page', () => {
    const component = shallow(
      <Pagination
        setRemoteState={setRemoteState}
        totalRows={20}
      />
    );

    expect(component.state().resultsPerPage).toEqual(10);

    const resultsPerPage = component.find('.numResultsSelect > select');

    expect(resultsPerPage.isEmpty()).toBeFalsy();

    resultsPerPage.simulate('change', { target: { value: 25 } });
    expect(component.state().resultsPerPage).toEqual(25);

    resultsPerPage.simulate('change', { target: { value: -1 } });
    expect(component.state().resultsPerPage).toEqual(25);
  });

  it('Allows the user to go to a specific page of results', () => {
    const component = shallow(
      <Pagination
        setRemoteState={setRemoteState}
        totalRows={31}
      />
    );

    const pageInput = component.find('.pageInput');

    expect(pageInput.isEmpty()).toBeFalsy();

    pageInput.simulate('change', { target: { value: 2 } });
    expect(component.state().currentPage).toEqual(2);

    pageInput.simulate('change', { target: { value: 3 } });
    expect(component.state().currentPage).toEqual(3);

    pageInput.simulate('change', { target: { value: 4 } });
    expect(component.state().currentPage).toEqual(4);

    pageInput.simulate('change', { target: { value: 5 } });
    expect(component.state().currentPage).toEqual(4);

    pageInput.simulate('change', { target: { value: 0 } });
    expect(component.state().currentPage).toEqual(4);

    pageInput.simulate('change', { target: { value: 'abc' } });
    expect(component.state().currentPage).toBe(4);
  });
});
