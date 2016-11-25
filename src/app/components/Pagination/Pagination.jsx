import React from 'react';
import styles from './styles.css';

const propTypes = {
  shouldRender: React.PropTypes.bool,
  setRemoteState: React.PropTypes.func.isRequired,
  totalRows: React.PropTypes.number.isRequired,
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsPerPage: 10,
      currentPage: 1,
    };

    this.resultOptions = [
      { name: 'Showing 10 rows', value: 10 },
      { name: 'Showing 25 rows', value: 25 },
      { name: 'Showing 50 rows', value: 50 },
      { name: 'Showing 100 rows', value: 100 },
      { name: 'Showing 250 rows', value: 250 },
    ];

    this.setRemoteState = props.setRemoteState;
    this.onResultsPerPageUpdate = this.onResultsPerPageUpdate.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  onResultsPerPageUpdate(resultsPerPage) {
    this.setState(resultsPerPage);
    this.setRemoteState(resultsPerPage);
  }

  previousPage() {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
      this.setRemoteState({ currentPage: this.state.currentPage - 1 });
    }
  }

  nextPage() {
    if (this.state.currentPage < Math.ceil(this.props.totalRows / this.state.resultsPerPage)) {
      this.setState({ currentPage: this.state.currentPage + 1 });
      this.setRemoteState({ currentPage: this.state.currentPage + 1 });
    }
  }

  goToPage(e) {
    const newPage = e.target.value;

    if (!newPage ||
      newPage < 1 ||
      newPage > Math.ceil(this.props.totalRows / this.state.resultsPerPage)) {
      return;
    }

    this.setState({ currentPage: newPage });
    this.setRemoteState({ currentPage: newPage });
  }

  render() {
    if (!this.props.shouldRender) {
      return null;
    }

    // Generate list of options for number of results.
    const resultOptions = this.resultOptions.map(
      (option, index) => <option key={index} value={option.value}>{option.name}</option>
    );

    const fromRecords = ((this.state.currentPage - 1) * this.state.resultsPerPage) + 1;
    let toRecords;

    if (this.state.currentPage * this.state.resultsPerPage > this.props.totalRows) {
      toRecords = this.props.totalRows;
    } else {
      toRecords = this.state.currentPage * this.state.resultsPerPage;
    }

    const numPages = Math.ceil(this.props.totalRows / this.state.resultsPerPage);

    return (
      <div className={styles.pagination}>
        <div className={styles.numResultsSelect}>
          <select
            value={this.state.resultsPerPage}
            onChange={(e) => {
              this.onResultsPerPageUpdate({ resultsPerPage: e.target.value });
            }}
          >
            {resultOptions}
          </select>
        </div>
        <div className={styles.pageSelect}>
          <span className={styles.previousPage} onClick={() => { this.previousPage(); }}>▼</span>
          <span>
            Viewing {fromRecords}
            -
            {toRecords} of {this.props.totalRows}
          </span>
          <span className={styles.nextPage} onClick={() => { this.nextPage(); }}>▼</span>
        </div>
        <div className={styles.goto}>
          <span>Go to page: </span>
          <input
            className={styles.pageInput}
            value={this.state.currentPage}
            onChange={this.goToPage}
          />
          <span> of {numPages}</span>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = propTypes;

export default Pagination;
