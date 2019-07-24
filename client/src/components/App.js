import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom';
import history from '../history'
import "./../styles/main.scss"

class App extends React.Component {
  render () {
    return (
      <div className="app-container">
        <Router history={history}>
          <div className="app-container">

          </div>
        </Router>
      </div>
    )
  }
}

export default App
