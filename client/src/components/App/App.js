import React from 'react'
import { Route, Router, Switch } from 'react-router-dom';
import history from '../../history';
import HomePage from '../HomePage/HomePage';
import Sidebar from '../Sidebar/Sidebar';
import styles from './App.module.scss';

class App extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <Sidebar/>
        <Router history={history}>
           <Switch>
             <Route path="/" exact component={HomePage}/>
           </Switch>
        </Router>
      </div>
    )
  }
}

export default App
