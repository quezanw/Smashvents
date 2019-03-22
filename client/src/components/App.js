import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom';
import SignupModal from './SignupModal'
import LoginModal from './LoginModal'
import Nav from './Nav'
import history from '../history';

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <div>
            <Nav />
            <Switch>
              <Route path="/signup" exact component={SignupModal}/>
              <Route path="/login" exact component={LoginModal}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
