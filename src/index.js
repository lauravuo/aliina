import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './store';

import NavBar from './components/nav-bar';
import NoMatch from './components/no-match';
import Error from './containers/error';
import Home from './containers/home';
import Playlist from './containers/playlist';
import Page from './containers/page';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Error />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/playlist/:id" component={Playlist} />
          <Route path="/page" component={Page} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
