import React from 'react';
import styles from './styles.css';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  toggleExpand: React.PropTypes.func,
};

class TableDataRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
    this.props.toggleExpand();
  }

  render() {
    const headings = Object.keys(this.props.headings);
    const expanded = this.state.expanded ? styles.expanded : styles.expander;
    const showExpander = (this.props.data.expand &&
      Array.isArray(this.props.data.expand) &&
      this.props.data.expand.length > 0) ||
      (typeof this.props.data.expand === 'string');

    return (
      <tr>
        <td>
          { showExpander &&
            <div onClick={this.toggleExpand} className={expanded}>
              ▼
            </div>
          }
        </td>
        {headings.map(
          (heading, index) =>
            <td key={index}>
              <div className={styles.container}>
                {this.props.data[heading]}
              </div>
            </td>
        )}
      </tr>
    );
  }
}

TableDataRow.propTypes = propTypes;

export default TableDataRow;
