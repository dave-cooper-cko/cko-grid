import React from 'react';

const propTypes = {
  setRemoteState: React.PropTypes.func.isRequired,
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };

    this.setRemoteState = props.setRemoteState;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
    this.setRemoteState({ searchText: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Search.propTypes = propTypes;

export default Search;
