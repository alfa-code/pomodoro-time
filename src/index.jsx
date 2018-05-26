import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

// components
import MainContainer from 'src/app/components/main-container';

// r/r
import { Provider } from 'react-redux';
import store from 'src/store';

// global styles
import 'normalize.css/normalize.css';
import 'src/styles';

const App = function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
