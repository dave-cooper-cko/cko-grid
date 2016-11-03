import React from 'react';
import { shallow } from 'enzyme';

import TableHeadings from '../TableHeadings';

let headings;


describe('TableHeadings', () => {
  beforeEach(() => {
    headings = {
      name: 'Name',
      age: 'Age',
      favouriteFood: 'Favourite Food',
    };
  });

  it('Renders successfully', () => {
    const component = shallow(<TableHeadings headings={headings} />);

    expect(component).toBeDefined();
  });

  it('Renders the correct number of headings', () => {
    let numHeaders = Object.keys(headings).length;

    let component = shallow(<TableHeadings headings={headings} />);
    let renderedHeaders = component.find('th');

    expect(numHeaders).toEqual(renderedHeaders.length);

    headings.newHeading = 'new';

    numHeaders = Object.keys(headings).length;
    component = shallow(<TableHeadings headings={headings} />);
    renderedHeaders = component.find('th');

    expect(numHeaders).toEqual(renderedHeaders.length);
  });
});
