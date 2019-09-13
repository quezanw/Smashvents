import React from 'react'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/index';
import { Route, Router, Switch} from 'react-router-dom';
import history from '../../history';
import HomePage from '../HomePage/HomePage';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import Modal from '../Modal/Modal';
import EventPage from '../EventPage/EventPage';
import AttendeesList from '../AttendeesList/AttendeesList';
import EventEdit from '../Events/EventEdit/EventEdit';
import EventCreate from '../Events/EventCreate/EventCreate';
import EventSearch from '../EventSearch/EventSearch';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import styles from './App.module.scss';
import '../../styles/main.scss';

class App extends React.Component {
  componentDidMount() {
    window.addEventListener('touchend', this.handleTouch);
  }

  handleTouch = e => {
    let target = e.target;
    let parent = target.offsetParent;
    if(parent) {
      if(window.innerWidth < 900 && target.id !== 'sidebar' && parent.id !== 'sidebar') {
        document.getElementById('sidebar').style.opacity = 0;
        document.getElementById('sidebar').style.visibility = 'hidden';
      }
    }
  }

  renderModals = () => {
    if(this.props.modal.content) {
      return <Modal content={this.props.modal.content}/>
    }
  }

  render () {
    const Page404 = ({ location }) => (
      <div className={styles.headerError}>
         <h2>No match found for <code>{location.pathname}</code></h2>
      </div>
   );
    return (
      <div className={styles.container}>
        {this.renderModals()}
        <Sidebar />
        <div className={styles.main}>
          <Topbar/>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/event/search" exact component={EventSearch}/>
              <Route path="/event/create" exact component={EventCreate}/>
              <Route path="/event/:title/details" exact component={EventPage}/>
              <Route path="/event/:title/attendees" exact component={AttendeesList}/>
              <Route path="/event/:title/edit" exact component={EventEdit}/>
              <Route path="/profile/settings" exact component={ProfileSettings}/>
              <Route component={Page404}/>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  }
}

export default connect(mapStateToProps, { openModal, closeModal })(App)
