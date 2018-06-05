import React from 'react';
import axios from 'axios';
import Component from './Component.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      val: [];
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch(dateRange) {
    console.log(dateRange);
    axios.get(`/api/${dateRange}`)
      .then(res => {
        charObj.labels = res.data[0];
        this.setState({
          charData: charObj
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <Component fetch = {this.fetch.bind(this)} />
      </div>
    )
  }
}

export default App;

