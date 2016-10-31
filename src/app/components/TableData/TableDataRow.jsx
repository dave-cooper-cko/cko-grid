import React from 'react';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
};

function getTdValue(heading, data) {
  return data[heading] ? data[heading] : 'NO DATA';
}

function TableDataRow(props) {
  const headings = Object.keys(props.headings);

  return (
    <tr>
      {headings.map(
        (heading, index) => <td key={index}>{getTdValue}{props.data[heading]}</td>
    )}
    </tr>
  );
}

TableDataRow.propTypes = propTypes;

export default TableDataRow;
