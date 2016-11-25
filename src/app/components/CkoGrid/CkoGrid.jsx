import React from 'react';
import { merge } from 'lodash';
import TableHeadings from '../TableHeadings';
import { TableDataRows } from '../TableData';
import Search from '../Search';
import Pagination from '../Pagination';
import styles from './styles.css';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  refreshData: React.PropTypes.func.isRequired,
  search: React.PropTypes.bool,
  title: React.PropTypes.string,
  pagination: React.PropTypes.bool,
};

class CkoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      totalRows: 0,
      remoteState: {
        resultsPerPage: 10,
        currentPage: 1,
        startIndex: 0,
      },
    };

    this.refreshData = props.refreshData;

    this.setRemoteState = this.setRemoteState.bind(this);
  }

  componentDidMount() {
    this.refreshData(this.state.remoteState)
      .subscribe((response) => {
        this.setState({
          data: response.data,
          totalRows: response.totalRows,
        }); }
      );
  }

  setRemoteState(newState) {
    if (typeof newState !== 'undefined' && newState !== {}) {
      const newRemoteState = merge(this.state.remoteState, newState);
      this.setState({ remoteState: newRemoteState });
      this.refreshData(this.state.remoteState)
        .subscribe(response =>
          this.setState({
            data: response.data,
            totalRows: response.totalRows,
            startIndex: response.startIndex,
          })
        );
    }
  }

  render() {
    return (
      <div>
        <div className={styles.toolbar}>
          <h3>{this.props.title}</h3>
          <Search
            shouldRender={this.props.search}
            setRemoteState={this.setRemoteState}
          />
        </div>
        <table className={styles.grid}>
          <TableHeadings
            headings={this.props.headings}
            setRemoteState={this.setRemoteState}
          />
          <TableDataRows
            data={this.state.data}
            headings={this.props.headings}
          />
        </table>
        <Pagination
          shouldRender={this.props.pagination}
          setRemoteState={this.setRemoteState}
          totalRows={this.state.totalRows}
          startIndex={this.state.startIndex}
        />
      </div>
    );
  }
}

CkoGrid.propTypes = propTypes;

if (typeof window.getAngularContext !== 'undefined') {
  window.getAngularContext().value('CkoGrid', CkoGrid);
}

export default CkoGrid;
