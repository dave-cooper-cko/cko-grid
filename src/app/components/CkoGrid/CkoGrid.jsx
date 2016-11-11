import React from 'react';
import { merge } from 'lodash';
import TableHeadings from '../TableHeadings';
import { TableDataRows } from '../TableData';
import Search from '../Search';
import styles from './styles.css';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  refreshData: React.PropTypes.func.isRequired,
  search: React.PropTypes.bool,
};

class CkoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headings: props.headings,
      data: [],
      search: props.search,
      remoteState: {},
    };

    this.refreshData = props.refreshData;

    this.setRemoteState = this.setRemoteState.bind(this);
  }

  componentDidMount() {
    this.refreshData(this.state.remoteState)
      .subscribe(data => this.setState({ data }));
  }

  setRemoteState(newState) {
    if (typeof newState !== 'undefined' && newState !== {}) {
      const newRemoteState = merge(this.state.remoteState, newState);

      this.setState({ remoteState: newRemoteState });
      this.refreshData(this.state.remoteState)
        .subscribe(data => this.setState({ data }));
    }
  }

  render() {
    return (
      <div>
        <Search
          shouldRender={this.state.search}
          setRemoteState={this.setRemoteState}
        />
        <table className={styles.grid}>
          <TableHeadings
            headings={this.state.headings}
            setRemoteState={this.setRemoteState}
          />
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
