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
import EventEdit from '../Events/EventEdit/EventEdit';
import EventCreate from '../Events/EventCreate/EventCreate';
import styles from './App.module.scss';
import '../../styles/main.scss';

/* 
create state for window size = null
once app component mounts set state for window size
if window size is under 900px width hide sidebar and display topbar

if topbar is clicked show sidebar
add event listener to window for scrolling.
if window is scrolling change app state of isScrolling to true
if isScrolling is true and state of window size is under 900px width hide sidebar

*/

class App extends React.Component {
  componentDidMount() {
    window.addEventListener('touchend', this.handleTouch);
  }

  handleTouch = e => {
    let target = e.target;
    let parent = target.offsetParent.id;
    console.log(target);
    if(window.innerWidth < 900 && target.id !== 'sidebar' && parent !== 'sidebar') {
      document.getElementById('sidebar').style.opacity = 0;
      document.getElementById('sidebar').style.visibility = 'hidden';
    }
  }

  renderModals = () => {
    if(this.props.modal.content) {
      return <Modal content={this.props.modal.content}/>
    }
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderModals()}
        {/* {this.state.showSidbar ? <Sidebar/> : ''} */}
        <Sidebar ref={this.sidebarRef} />
        <div className={styles.main}>
          <Topbar/>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/event/create" exact component={EventCreate}/>
              <Route path="/event/:title/details" exact component={EventPage}/>
              <Route path="/event/:title/edit" exact component={EventEdit}/>
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
