import React from 'react';
import { merge, find } from 'lodash';
import TableHeadings from '../TableHeadings';
import TableRowGroup from '../TableRowGroup';
import Search from '../Search';
import Pagination from '../Pagination';
import styles from './styles.css';

const propTypes = {
  headings: React.PropTypes.object.isRequired,
  refreshData: React.PropTypes.func.isRequired,
  getExpandData: React.PropTypes.func,
  search: React.PropTypes.bool,
  title: React.PropTypes.string,
  pagination: React.PropTypes.bool,
  expandable: React.PropTypes.bool,
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
    this.getExpandData = this.getExpandData.bind(this);
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

  getExpandData(row) {
    this.props.getExpandData(row)
      .subscribe((response) => {
        const data = this.state.data;
        const found = find(data, d => d.id === response.id);
        found.expand = response.data;
        this.setState({ data });
      });
  }

  render() {
    return (
      <div>
        <div className={styles.toolbar}>
          <h3>{this.props.title}</h3>
          { this.props.search &&
            <Search setRemoteState={this.setRemoteState} />
          }
        </div>
        <table className={styles.grid}>
          <TableHeadings
            headings={this.props.headings}
            setRemoteState={this.setRemoteState}
            expandable={this.props.expandable}
          />
          { this.state.data.map(data =>
            <TableRowGroup
              key={data.id}
              data={data}
              headings={this.props.headings}
              getExpandData={this.getExpandData}
            />
          )}
        </table>
        { this.props.pagination &&
          <Pagination
            setRemoteState={this.setRemoteState}
            totalRows={this.state.totalRows}
            startIndex={this.state.startIndex}
          />
        }
      </div>
    );
  }
}

CkoGrid.propTypes = propTypes;

if (typeof window.getAngularContext !== 'undefined') {
  window.getAngularContext().value('CkoGrid', CkoGrid);
}

export default CkoGrid;
