import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { MainContainer } from 'Src/app/components/main-container';

import store from 'Src/store';

import {
    initTimer,
} from 'Src/actions/index';

// global styles
import 'normalize.css/normalize.css';
import 'Src/styles/global.css';

initTimer();

const App = function App() {
    return (
        <Router>
            <Provider store={store}>
                <Switch>
                    <Route path="/">
                        <MainContainer />
                    </Route>
                </Switch>
            </Provider>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<div>1111</div>, document.getElementById('app'));
