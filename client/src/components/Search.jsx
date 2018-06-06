import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onSubmit(e) {
    this.props.handleFetch(this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Enter URL:
            <input
              type="text"
              value={this.state.value}
              onChange={this.onChange}
            />
          </label>
          <input
            type="submit"
            value="Submit"
          />
        </form>
        <br />
        <div>
          Thanks for Submitting. Your Job ID is:
          <br />
          {this.props.jobId}
        </div>
      </div>
    )
  }

}

export default Search;