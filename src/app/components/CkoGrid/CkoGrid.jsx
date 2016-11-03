import React from 'react';
import Rx from 'rxjs/Rx';
import TableHeadings from '../TableHeadings';
import { TableDataRows } from '../TableData';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
  refreshData: React.PropTypes.object.isRequired,
};

class CkoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headings: props.headings,
      data: props.data,
      refreshData: props.refreshData,
    };

    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    this.state.refreshData.subscribe(data => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <table>
          <TableHeadings headings={this.state.headings} />
          <TableDataRows
            data={this.state.data}
            headings={this.state.headings}
          />
        </table>
      </div>
    );
  }
}

CkoGrid.propTypes = propTypes;

if (typeof window.getAngularContext !== 'undefined') {
  window.getAngularContext().value('CkoGrid', CkoGrid);
}

export default CkoGrid;
