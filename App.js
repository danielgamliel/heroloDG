
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import MainApp from './app/MainApp';
import Store from './redux/Store'


 export default class App extends Component {
  render() {
    return (
      <Provider store ={Store}>
      <MainApp/>
      </Provider>
    );
  }
}
