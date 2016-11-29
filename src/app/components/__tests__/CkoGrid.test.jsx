import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import CkoGrid from '../CkoGrid';
import Search from '../Search';
import Pagination from '../Pagination';

let refreshData;
let headings;

describe('CkoGrid', () => {
  beforeEach(() => {
    refreshData = sinon.stub();
    headings = {
      name: { name: 'Name', sort: true },
      age: { name: 'Age', sort: true },
      favouriteFood: { name: 'Favourite Food', sort: false },
    };
  });

  it('Renders successfully', () => {
    const component = shallow(
      <CkoGrid
        headings={headings}
        refreshData={refreshData}
        title="Test"
      />
    );

    expect(component).toBeDefined();
  });

  it('Renders optional components correctly', () => {
    const component = shallow(
      <CkoGrid
        headings={headings}
        refreshData={refreshData}
        title="Test"
        search
      />
    );

    const search = component.find(Search);
    const pagination = component.find(Pagination);

    expect(search.isEmpty()).toBeFalsy();
    expect(pagination.isEmpty()).not.toBeFalsy();
  });
});
