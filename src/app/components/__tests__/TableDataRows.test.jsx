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
      name: { name: 'Name', sort: true },
      age: { name: 'Age', sort: true },
      favouriteFood: { name: 'Favourite Food', sort: false },
    };
  });

  it('Renders successfully', () => {
    const component = shallow(<TableDataRows data={data} headings={headings} />);

    expect(component).toBeDefined();
  });

  it('Generates the right number of TableRows', () => {
    let component = shallow(<TableDataRows data={data} headings={headings} />);
    let tableDataRows = component.find('TableDataRow');

    expect(tableDataRows.length).toEqual(data.length);

    data.push({ name: 'Vlad', age: 26, favouriteFood: 'Lettuce' });
    component = shallow(<TableDataRows data={data} headings={headings} />);
    tableDataRows = component.find('TableDataRow');

    expect(tableDataRows.length).toEqual(data.length);
  });
});
