import React, { useState } from 'react';

import { Sidebar } from './components'
import {
  Dashboard,
  Analysis,
  About,
} from './containers'

import {
  Button,
} from 'react-bootstrap'

import Logo from "./assets/img/ifest-logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeAsia,
  faChartArea,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

import './App.scss';

/**
 * List of sidebar buttons
 * Arguments: link, name, icon, component (in this order)
**/

const App = () => {
  const links = [
    new Sidebar.ButtonPrototype("dashboard", "Dashboard", <FontAwesomeIcon icon={faGlobeAsia} />, <Dashboard />),
    new Sidebar.ButtonPrototype("analysis", "Analysis", <FontAwesomeIcon icon={faChartArea} />, <Analysis />),
    new Sidebar.ButtonPrototype("about", "About", <FontAwesomeIcon icon={faInfoCircle} />, <About />),
  ]
  
  const [currentPage, setPage] = useState(links[0]);
  
  return (
    <div className="root">
      <Sidebar.Container>
        <Sidebar.Logo>
          <img alt="Logo" src={Logo} />
        </Sidebar.Logo>
        {
          links.map((link, index) => (
            <Sidebar.Button key={index + 1} overlay={link.name}>
              <Button
                className="sidebar-button"
                variant="info"
                onClick={() => setPage(link)}
                active={link.name === currentPage.name}
              >
                {link.icon}
              </Button>
            </Sidebar.Button>
          ))
        }
      </Sidebar.Container>

      <div id={currentPage.name} className="App">
        {currentPage.component}
      </div>
    </div>
  )
}

export default App;
