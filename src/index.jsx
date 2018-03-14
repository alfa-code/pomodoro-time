import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// components
import MainContainer from '@src/app/components/main-container';

// r/r
import { Provider } from 'react-redux';
import store from '@src/store';

// global styles
import 'normalize.css/normalize.css';
import '@src/styles';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));