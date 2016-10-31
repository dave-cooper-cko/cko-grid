import React from 'react';
import TableHeadings from '../TableHeadings';
import { TableDataRows } from '../TableData';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
};

function CkoGrid(props) {
  return (
    <div>
      <table>
        <TableHeadings headings={props.headings} />
        <TableDataRows data={props.data} headings={props.headings} />
      </table>
    </div>
  );
}

CkoGrid.propTypes = propTypes;

export default CkoGrid;
