import { configureStore } from '@reduxjs/toolkit';
import {
  ConnectedRouter,
  push,
  routerMiddleware,
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React, { lazy, Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AppState, getReducer } from './core/store/store';
import ChatsPage from './pages/ChatsPage/ChatsPage';
import './App.scss';
import { login } from './core/store/actions/auth.actions';

const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const history = createBrowserHistory();
const reducer = getReducer(history);

const store = configureStore<AppState>({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)) as any,
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  const { dispatch } = store;
  const email = localStorage.getItem('user');
  useEffect(() => {
    (async () => {
      if (email) {
        await dispatch(login({ email, loggedIn: true }));
        dispatch(push('/chats'));
      }
    })();
  }, [dispatch, email]);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="app">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/sign-in" component={AuthPage} />
              <Redirect exact from="/" to="/sign-in" />
              <ProtectedRoute
                component={ChatsPage}
                condition={!!email}
                path="/chats"
                exact
              />
              <Route path="/404" component={NotFoundPage} />
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default App;
