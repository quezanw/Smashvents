import React from 'react';
import { connect } from 'react-redux';
import AttendeeCard from './AttendeeCard/AttendeeCard';
import Auth from '../Auth/Auth';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import styles from './EventPage.module.scss';
import 
{ getAttendees, 
  fetchHost, 
  openModal, 
  joinEvent, 
  leaveEvent 
} 
from '../../actions/index';

class EventPage extends React.Component {

  openModal = e => {
    e.preventDefault();
    this.props.openModal({ content: <Auth/> })
  }

  isAttending = (user_id) => {
    for(let user of this.props.event.attendees) {
      if(user.user_id === user_id) return true;
    }
    return false;
  }

  joinEvent = () => {
    this.props.joinEvent(this.props.event.event_id);
  }

  leaveEvent = () => {
    this.props.leaveEvent(this.props.event.event_id);
  }

  renderJoinButton = () => {
    let auth = this.props.auth;
    if(auth.isSignedIn) {
      if(this.isAttending(auth.user_id)) {
        return (
          <button onClick={this.leaveEvent}>
            Leave Event
          </button>
        );
      }
      return (
        <button onClick={this.joinEvent}>
          Join Event
        </button>
      );
    }
    return (
      <div className={styles.login_btn}>
        <button onClick={e => this.openModal(e)}>
          Login to join the event!
        </button>
      </div>
    );
  }

  renderLocation = () => {
    let center = {
      lat: 47.60,
      lng: -122.33
    }
    let zoom = 11
    if(!this.props.event.online) {
      return (
        <div className={styles.outerContainer}>
          <h1>Location</h1>
          <div className={styles.container}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={center}
              defaultZoom={zoom}
            >
              {/* <div
              className={styles.marker}
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              ></div> */}
            </GoogleMapReact>
          </div>
        </div>
      )
    }
  }

  render() {
    let event = this.props.event
    const renderAttendees = event.attendees.map(user => <AttendeeCard key={user.username} user={user} />)
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}></div>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>{event.title}</h1>
            <div className={styles.details}>
              <p>{moment(event.start_date).format('MMM Do YYYY')}</p>
              <p>{event.online ? 'Online' : event.venue}</p>
              <p>{event.host ? event.host.username : '...loading'}</p>
            </div>
          </div>
          <div className={styles.btnContainer}>
            {this.renderJoinButton()}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.descriptionContainer}>
            <p>
            {event.description}
            </p>
          </div>
          <div className={styles.outerContainer}>
            <h1>Attendees</h1>
            <div className={styles.attendees}>
              {renderAttendees}
            </div>
          </div>
          {this.renderLocation()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.selectedEvent,
    auth: state.auth
  }
}

export default connect(mapStateToProps, 
  { getAttendees, 
    fetchHost, 
    openModal,
    joinEvent,
    leaveEvent 
  })(EventPage)