import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  // fetch(dateRange) {
  //   console.log(dateRange);
  //   axios.get(`/api/${dateRange}`)
  //     .then(res => {
  //       charObj.labels = res.data[0];
  //       this.setState({
  //         charData: charObj
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  render() {
    return (
      <div>
        <h1>react working</h1>
      </div>
    )
  }
}

export default App;

