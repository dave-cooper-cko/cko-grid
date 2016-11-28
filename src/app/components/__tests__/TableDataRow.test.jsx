import React from 'react';
import { shallow } from 'enzyme';
import { TableDataRow } from '../TableData';

let data;
let headings;

describe('TableDataRow', () => {
  beforeEach(() => {
    data = { name: 'Dave', age: 26, favouriteFood: 'Peanut butter' };

    headings = {
      name: { name: 'Name', sort: true },
      age: { name: 'Age', sort: true },
      favouriteFood: { name: 'Favourite Food', sort: false },
    };
  });

  it('Renders correctly', () => {
    const component = shallow(<TableDataRow headings={headings} data={data} />);

    expect(component).toBeDefined();
  });

  it('Renders the correct number of data cells', () => {
    let component = shallow(<TableDataRow headings={headings} data={data} />);
    let cells = component.find('td');

    expect(cells.length).toEqual(Object.keys(data).length);

    data.favouriteSeason = 'Summer';
    headings.favouriteSeason = { name: 'Favourite Season', sort: false };

    component = shallow(<TableDataRow headings={headings} data={data} />);
    cells = component.find('td');

    expect(cells.length).toEqual(Object.keys(data).length);
  });
});
