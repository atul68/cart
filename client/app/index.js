import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';

import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import Edit from './components/Edit/Edit';

import Detail from './components/Detail/Detail';

import Add from './components/Add/Add';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>        
        <Route path='/detail/:id' component={Detail} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/add' component={Add} />
        <Route exact path="/" component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
