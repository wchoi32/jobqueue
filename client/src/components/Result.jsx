import React from 'react';

class Result extends React.Component {
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
    this.props.getStatus(this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Enter Job ID:
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
          Job Status is:
          <br />
          {this.props.jobStatus}
        </div>
      </div>
    )
  }

}

export default Result;
