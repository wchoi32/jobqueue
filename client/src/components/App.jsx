import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import Result from './Result.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      htmlSrc: [],
      jobId: '',
      jobStatus: '',
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {

  }

  handleFetch(url) {
    axios.post('/convertUrl', {
      data: url
    })
      .then(((response) => {
        this.setState({
          jobId: response.data
        })
      }))
      .catch((error) => {
        console.log(error);
      });
  }

  getStatus(jobid) {
    axios.get(`/job/${jobid}`)
      .then((response) => {
        this.setState({
          jobStatus: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Job Queue</h1>
        <Search
          handleFetch={this.handleFetch}
          jobId={this.state.jobId}
        />
        <br />
        <Result
          getStatus={this.getStatus}
          jobStatus={this.state.jobStatus}
        />
      </div>
    )
  }
}

export default App;

