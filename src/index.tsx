import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Provider } from 'react-redux';

import * as Cookies from 'js-cookie';

import { MainContainer } from 'Src/app/components/main-container';

import store from 'Src/store';

import {
    initTimer,
} from 'Src/actions/index';

// global styles
import 'normalize.css/normalize.css';
import 'Src/styles/global.css';

const timerPeriod = Cookies.get('timerPeriod');
const timerBreak = Cookies.get('timerBreak');

// Init The timer
initTimer({
    pomodoro: (typeof timerPeriod === 'string' ? (parseInt(timerPeriod) * 60000) : 20000),
    break: (typeof timerBreak === 'string' ? (parseInt(timerBreak) * 60000) : 5000),
});

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
