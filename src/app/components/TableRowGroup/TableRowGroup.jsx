import React from 'react';
import TableDataRow from '../TableData';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  getExpandData: React.PropTypes.func,
};

class TableRowGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    // Make sure we only call subscribe() when we need to.
    if (!this.state.expanded) {
      this.props.getExpandData(this.props.data);
    }

    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    let expandRows = [];

    if (this.state.expanded) {
      expandRows = this.props.data.expand.map((row, index) =>
        <TableDataRow
          key={index}
          headings={this.props.headings}
          data={row}
        />
      );
    }

    return (
      <tbody>
        <TableDataRow
          headings={this.props.headings}
          data={this.props.data}
          toggleExpand={this.toggleExpand}
        />
        { this.state.expanded && expandRows }
      </tbody>
    );
  }
}

TableRowGroup.propTypes = propTypes;

export default TableRowGroup;
