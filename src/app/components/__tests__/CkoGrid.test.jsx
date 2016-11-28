import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import CkoGrid from '../CkoGrid';

let refreshData;

describe('CkoGrid', () => {
  beforeEach(() => {
    refreshData = sinon.stub();
  });

  it('Renders', () => {
    const headings = {
      name: 'Name',
      age: 'Age',
      favouriteFood: 'Favourite Food',
    };

    const data = [
      { name: 'Dave', age: 26, favouriteFood: 'Peanut Butter' },
    ];

    const component = shallow(
      <CkoGrid
        headings={headings}
        data={data}
        refreshData={refreshData}
        search={false}
      />
    );

    expect(component).toBeDefined();
  });
});
