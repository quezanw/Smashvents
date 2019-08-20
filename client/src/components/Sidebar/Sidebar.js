import React from 'react';
import { connect } from 'react-redux';
import { openModal, logout, fetchAttendingEvents, selectEvent } from '../../actions/index';
import styles from './Sidebar.module.scss';
import history from '../../history';
import Auth from '../Auth/Auth';

class Sidebar extends React.Component {
  
  componentDidMount() {
    if(this.props.auth.isSignedIn) {
      this.props.fetchAttendingEvents(this.props.auth.user_id);
    }
  }

  selectEvent = event => {
    this.props.selectEvent(event);
    history.push(`/event/${event.title}/details`);
  }

  openModal = e => {
    e.preventDefault();
    this.props.openModal({ content: <Auth/> })
  }

  logout = () => this.props.logout();

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
        <i className={`${styles.user} far fa-user`}></i>
        // <p>{auth.first_name.charAt(0).toUpperCase}</p>
      )
    }
  }

  render() {
    // if e1.user_id === user id e1 else e2
    // let eventsAttending = this.props.auth.attending.sort((e1, e2) => e1.user_id === this.props.auth.user_id?  )
    const eventsAttending = this.props.auth.attending.map(event => {
      return (
        <div key={event.event_id} onClick={() => this.selectEvent(event)} className={styles.block}>
          <img src={`/assets${event.icon_path}`} alt=""/>
          <p>{event.title}</p>
        </div>
      )
    })
    return (
      <div className={styles.sidebar}>
        <i className={`${styles.home} fas fa-home`} onClick={() => history.push('/')}></i>
        {this.renderIcon()}
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

export default connect(mapStateToProps, { openModal, logout, fetchAttendingEvents, selectEvent })(Sidebar);