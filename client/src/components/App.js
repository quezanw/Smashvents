import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom';
import SignupModal from './navigation/SignupModal'
import LoginModal from './navigation/LoginModal'
import Nav from './navigation/Nav'
import history from '../history'
import "../styles/main.css"

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <div className="app-container">
            <Nav />
            <Switch>
              <Route path="/signup" exact component={SignupModal}/>
              <Route path="/login" exact component={LoginModal}/>
            </Switch>
            <div className="sub-container">
            
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
