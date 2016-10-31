import React from 'react';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
};

function TableHeadings(props) {
  const headings = Object.keys(props.headings);

  return (
    <thead>
      <tr>
        {headings.map((name, index) => <th key={index}>{props.headings[name]}</th>)}
      </tr>
    </thead>
  );
}

TableHeadings.propTypes = propTypes;

export default TableHeadings;
