import React from 'react';
import { TableDataRow } from './';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
};

function generateTableRows(data, headings) {
  return data.map(
    (rowData, index) => <TableDataRow key={index} data={rowData} headings={headings} />
  );
}

function TableDataRows(props) {
  const tableRows = generateTableRows(props.data, props.headings);
  return (
    <tbody>
      {tableRows}
    </tbody>
  );
}

TableDataRows.propTypes = propTypes;

export default TableDataRows;
