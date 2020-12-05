import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { store } from './core/store/store';

const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path="/sign-in"
                render={(props) => <AuthPage {...props} />}
              />
              <Redirect from="/" to="sign-in" />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
