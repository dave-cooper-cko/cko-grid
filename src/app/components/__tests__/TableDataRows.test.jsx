import React from 'react';
import { shallow } from 'enzyme';
import { TableDataRows } from '../TableData';

let data;
let headings;

describe('TableDataRows', () => {
  beforeEach(() => {
    data = [
      { name: 'Dave', age: 26, favouriteFood: 'Peanut butter' },
      { name: 'Yann', age: 12, favouriteFood: 'Blackberries' },
    ];

    headings = {
      name: 'Name',
      age: 'Age',
      favouriteFood: 'Favourite Food',
    };
  });

  it('Renders correctly', () => {
    const component = shallow(<TableDataRows data={data} headings={headings} />);

    expect(component).toBeDefined();
  });

  it('Generates the right number of TableRows', () => {
    const component = shallow(<TableDataRows data={data} headings={headings} />);
  });
});
