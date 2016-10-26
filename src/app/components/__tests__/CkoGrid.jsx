import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import chaiJestSnapshot from 'chai-jest-snapshot';

import CkoGrid from '../CkoGrid';

chai.use(chaiJestSnapshot);

describe('CkoGrid', () => {
  it('Renders', () => {
    expect(shallow(<CkoGrid />)).toBeDefined();
  });
});
