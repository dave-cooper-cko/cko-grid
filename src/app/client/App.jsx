import React from 'react';
import { render } from 'react-dom';
import CkoGrid from '../components/CkoGrid';

const headings = {
  name: 'Name',
  age: 'Age',
};

const data = [
  { name: 'Dave', age: 26 },
  { name: 'Yann', age: 12 },
];

render(<CkoGrid headings={headings} data={data} />, document.getElementById('app'));
