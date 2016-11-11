import React from 'react';
import styles from './styles.css';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  setRemoteState: React.PropTypes.func.isRequired,
};

class TableHeadings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headings: props.headings,
      sortColumn: '',
      sortDirection: '',
    };

    this.toggleSort = this.toggleSort.bind(this);
    this.setRemoteState = props.setRemoteState;
  }

  toggleSort(sortColumn) {
    let sortDirection;

    if (!this.state.sortDirection) {
      sortDirection = 'desc';
    } else {
      sortDirection = this.state.sortDirection === 'desc' ? 'asc' : 'desc';
    }

    this.setState({
      sortColumn,
      sortDirection,
    });

    this.setRemoteState({
      sortColumn,
      sortDirection,
    });
  }

  render() {
    const headingKeys = Object.keys(this.state.headings);

    return (
      <thead>
        <tr>
          {headingKeys.map((header, index) =>
            <th key={index} onClick={() => { this.toggleSort(header); }}>
              <div className={styles.container}>
                <div className={styles.title}>
                  <div className={styles.wrapper}>
                    {this.state.headings[header].name}
                  </div>
                </div>
                <div className={styles.selector}>
                  <span className={(header === this.state.sortColumn) && (this.state.sortDirection === 'asc') ? styles.arrowActive : styles.arrowInactive}>▲</span>
                  <span className={(header === this.state.sortColumn) && (this.state.sortDirection === 'desc') ? styles.arrowActive : styles.arrowInactive}>▼</span>
                </div>
              </div>
            </th>
          )}
        </tr>
      </thead>
    );
  }
}

TableHeadings.propTypes = propTypes;

export default TableHeadings;
