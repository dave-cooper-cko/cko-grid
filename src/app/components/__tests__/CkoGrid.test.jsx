import React from 'react';
import { shallow } from 'enzyme';

import CkoGrid from '../CkoGrid';

describe('CkoGrid', () => {
  it('Renders', () => {
    const headings = {
      name: 'Name',
      age: 'Age',
      favouriteFood: 'Favourite Food',
    };

    const data = [
      { name: 'Dave', age: 26, favouriteFood: 'Peanut Butter' },
    ];

    const component = shallow(<CkoGrid headings={headings} data={data} />);

    expect(component).toBeDefined();
  });
});
