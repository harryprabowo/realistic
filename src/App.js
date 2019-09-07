import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { Sidebar } from './components'
import {
  Dashboard,
  About,
} from './containers'

import './App.scss';

// List of sidebar buttons
const links = [
  new Sidebar.ButtonPrototype("dashboard", "Dashboard", <i className="fas fa-lg fa-home" />, Dashboard),
  new Sidebar.ButtonPrototype("about", "About", <i className="fas fa-lg fa-info-circle" />, About),
]

const App = () => {
  return (
    <Router>
      <Sidebar.Container>
        {
          links.map((link, index) => (
            <Sidebar.Button key={index + 1}>
              <NavLink to={`/` + link.link} activeClassName="active">{link.icon}</NavLink>
            </Sidebar.Button>
          ))
        }
      </Sidebar.Container>
      <div id="App">
        {
          links.map((link, index) => (
            <Route key={index + 1} path={'/' + link.link} exact component={link.component} />
          ))
        }
      </div> 
    </Router>
  )
}

export default App;
