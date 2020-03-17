import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

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
        <Router>
            <Provider store={store}>
                <Switch>
                    <Route path="/secret">
                        <div>
                            <iframe src="https://testjmb.alfabank.ru/ona/auth/login" title="https" width="1200" height="800"/>
                        </div>
                    </Route>
                    <Route path="/">
                        <MainContainer />
                    </Route>
                </Switch>
            </Provider>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
