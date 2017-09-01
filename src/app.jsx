import React, { Component } from 'react';
import MainContainer from '@src/app/components/main-container';
import { Provider } from 'react-redux'
import store from '@src/store.js'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}

export default App;
