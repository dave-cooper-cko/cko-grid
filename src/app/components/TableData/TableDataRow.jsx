import React from 'react';
import styles from './styles.css';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
};

function TableDataRow(props) {
  const headings = Object.keys(props.headings);

  return (
    <tr>
      {headings.map(
        (heading, index) =>
          <td key={index}>
            <div className={styles.container}>
              {props.data[heading]}
            </div>
          </td>
      )}
    </tr>
  );
}

TableDataRow.propTypes = propTypes;

export default TableDataRow;
