import React from 'react'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/index';
import { Route, Router, Switch} from 'react-router-dom';
import history from '../../history';
import HomePage from '../HomePage/HomePage';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import EventPage from '../EventPage/EventPage';
import styles from './App.module.scss';



class App extends React.Component {

  renderModals() {
    if(this.props.modal.content) {
      return <Modal content={this.props.modal.content}/>
    }
  }


  render () {
    return (
      <div className={styles.container}>
        {this.renderModals()}
        <Sidebar/>
        <Router history={history}>
           <Switch>
             <Route path="/" exact component={HomePage}/>
             <Route path="/event/:title/details" exact component={EventPage}/>
           </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    modal: state.modal
  }
}

export default connect(mapStateToProps, { openModal, closeModal })(App)
