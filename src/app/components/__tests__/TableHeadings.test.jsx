import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TableHeadings from '../TableHeadings';

let headings;
let setRemoteState;

describe('TableHeadings', () => {
  beforeEach(() => {
    headings = {
      name: { name: 'Name', sort: true },
      age: { name: 'Age', sort: true },
      favouriteFood: { name: 'Favourite Food', sort: false },
    };
    setRemoteState = sinon.stub();
  });

  it('Renders successfully', () => {
    const component = shallow(
      <TableHeadings
        headings={headings}
        setRemoteState={setRemoteState}
      />
    );

    expect(component).toBeDefined();
  });

  it('Renders the correct number of headings', () => {
    let numHeaders = Object.keys(headings).length;

    let component = shallow(
      <TableHeadings
        headings={headings}
        setRemoteState={setRemoteState}
      />
    );

    let renderedHeaders = component.find('th');

    expect(numHeaders).toEqual(renderedHeaders.length);

    headings.newHeading = 'new';

    numHeaders = 4;
    component = shallow(
      <TableHeadings
        headings={headings}
        setRemoteState={setRemoteState}
      />
    );

    renderedHeaders = component.find('th');

    expect(numHeaders).toEqual(renderedHeaders.length);
  });

  it('Sets the correct sortDirection when headers are clicked', () => {
    const component = shallow(
      <TableHeadings
        headings={headings}
        setRemoteState={setRemoteState}
      />
    );

    let header = component.find('th').at(0);
    header.simulate('click');
    expect(component.state().sortDirection).toEqual('desc');
    header.simulate('click');
    expect(component.state().sortDirection).toEqual('asc');

    header = component.find('th').at(1);
    header.simulate('click');
    expect(component.state().sortDirection).toEqual('desc');

    header = component.find('th').at(0);
    header.simulate('click');
    expect(component.state().sortDirection).toEqual('desc');
  });

  it('Only renders a selector for sortable columns', () => {
    const component = shallow(
      <TableHeadings
        headings={headings}
        setRemoteState={setRemoteState}
      />
    );

    let header = component.find('th').at(0);
    expect(header.find('.selector').length).toEqual(1);

    header = component.find('th').at(2);
    expect(header.find('.selector').length).toEqual(0);
  });

  it('Does not call `toggleSort` for unsortable columns when the header is clicked', () => {
    const component = shallow(
      <TableHeadings
        headings={headings}
        setRemoteState={setRemoteState}
      />
    );

    let header = component.find('th').at(0);
    header.simulate('click');
    const sortColumn = component.state().sortColumn;

    header = component.find('th').at(2);
    header.simulate('click');
    expect(sortColumn).toEqual(component.state().sortColumn);
  });
});
