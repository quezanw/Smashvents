import React from 'react';
import { connect } from 'react-redux';
import styles from './Sidebar.module.scss';
import history from '../../history';
import Auth from '../Auth/Auth';
import { 
  openModal, 
  logout, 
  fetchAttendingEvents, 
  fetchHostedEvents,
  selectEvent
} 
from '../../actions/index';

class Sidebar extends React.Component {
  
  componentDidMount() {
    if(this.props.auth.isSignedIn) {
      this.props.fetchAttendingEvents(this.props.auth.user_id);
      this.props.fetchHostedEvents(this.props.auth.user_id);
    }
  }

  selectEvent = event => {
    this.hideSidebar();
    this.props.selectEvent(event);
    history.push(`/event/${event.title}/details`);
  }

  openProfileSettings = () => {
    this.hideSidebar();
    history.push('/profile/settings')
  }

  openModal = () => {
    this.hideSidebar();
    this.props.openModal({ content: <Auth/> })
  }

  logout = () => { 
    this.hideSidebar();
    this.props.logout();
  }

  renderLogin = () => {
    if(this.props.auth.isSignedIn) {
      return (
        <div onClick={this.logout} className={styles.login_wrapper}>
          <i className={`${styles.logout} fas fa-sign-out-alt`}></i>
          <p>Logout</p>
       </div>
      );
    }
    return (
      <div onClick={e => this.openModal(e)} className={styles.login_wrapper}>
        <i className={`${styles.login} fas fa-sign-in-alt`}></i>
        <p>Login</p>
      </div>
    ) 
  }

  renderIcon = () => {
    let auth = this.props.auth;
    if(auth.isSignedIn) {
      return (
        <div onClick={this.openProfileSettings} className={styles.user}>
          <div className={styles.userIcon}>{auth.username.charAt(0)}</div>
          <p>
            <span>Profile Settings</span>
          </p>
        </div>
      )
    }
  }

  createEventIcon = event => {
    return (
      <div key={event.event_id} onClick={() => this.selectEvent(event)} className={styles.block}>
        <img aria-describedby="title" src={`/assets${event.icon_path}`} alt="icon"/>
        <p id="title">
          <span>
            {event.title}
          </span>
        </p>
      </div>
    );
  }

  hideSidebar = () => {
    if(window.innerWidth < 900) {
      document.getElementById('sidebar').style.opacity = 0;
      document.getElementById('sidebar').style.visibility = 'hidden';
    }
  }

  goHome = e => {
    this.hideSidebar();
    history.push('/');
  }

  render() {
    const eventsHosting = this.props.auth.hosting.map(this.createEventIcon);
    const eventsAttending = this.props.auth.attending.map(this.createEventIcon);
    return (
      <div id="sidebar" className={styles.sidebar}>
        <div className={styles.home}>
          <div className={styles.homeContainer}>
            <i className={`fas fa-home`} onClick={this.goHome}></i>
          </div>
          <p>Home</p>
        </div>
        
        {this.renderIcon()}
        <div className={styles.eventScrollerHosting}>
          {eventsHosting}
        </div>
        <div className={styles.eventScroller}>
          {eventsAttending}
        </div>
        {this.renderLogin()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, 
  { 
    openModal, 
    logout, 
    fetchAttendingEvents, 
    fetchHostedEvents,
    selectEvent 
  })(Sidebar);