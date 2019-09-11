import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';

import { Sidebar } from './components'
import {
  Dashboard,
  Analytics,
  About,
  NotFound
} from './containers'

import './App.scss';

/**
 * List of sidebar buttons
 * Arguments: link, name, icon, component (in this order)
**/
const links = [
  new Sidebar.ButtonPrototype("dashboard", "Dashboard", <i className="fas fa-globe-asia" />, Dashboard),
  new Sidebar.ButtonPrototype("analytics", "Analytics", <i className="fas fa-chart-area" />, Analytics),
  new Sidebar.ButtonPrototype("about", "About", <i className="fas fa-info-circle" />, About),
]

const App = () => {
  return (
    <Router>
      <Sidebar.Container>
        {
          links.map((link, index) => (
            <Sidebar.Button key={index + 1} overlay={link.name}>
              <NavLink to={`/` + link.link} activeClassName="active">{link.icon}</NavLink>
            </Sidebar.Button>
          ))
        }
      </Sidebar.Container>

      <div id="App">
        <Switch>
          {
            links.map((link, index) => (
              <Route key={index + 1} path={'/' + link.link} exact component={link.component} />
            ))
          }

          {/* Edge cases handling */}
          <Route exact path='/' render={() => <Redirect to='/dashboard' />} />

          <Route path='/404' exact component={NotFound} />
          <Route render={() => <Redirect to='/404' />} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
