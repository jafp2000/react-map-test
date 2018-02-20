import React, { Component } from 'react';
import './App.css';
import Map from './component/map';
import Copy from './component/copy';

const API_CONFIG = {
  key:'AIzaSyASdqEa_TiJh82_xwQjo5jjNwmT4kvAAgQ',
  language: 'es'
}
const initialPosition = {lat: 48.858608, lng: 2.294471};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map config={API_CONFIG} initialPosition={initialPosition}/>
        <Copy/>
      </div>
    );
  }
}

export default App;
