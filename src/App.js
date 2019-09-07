import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Dashboard from './containers/Dashboard'
// import logo from './logo.svg';
// import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Dashboard} />
      </div>
    </Router>
  )
}

export default App;
