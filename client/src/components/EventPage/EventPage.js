import React from 'react';
import { connect } from 'react-redux';
import AttendeeCard from './AttendeeCard/AttendeeCard';
import CancelEvent from './CancelEvent/CancelEvent';
import Auth from '../Auth/Auth';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import history from '../../history';
import styles from './EventPage.module.scss';
import 
{ 
  getAttendees, 
  fetchHost, 
  openModal, 
  joinEvent, 
  leaveEvent,
} 
from '../../actions/index';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class EventPage extends React.Component {

  openAuth = e => {
    e.preventDefault();
    this.props.openModal({ content: <Auth/> })
  }

  openCancel = e => {
    e.preventDefault();
    this.props.openModal({ content: <CancelEvent event={this.props.event} /> })
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

  editEvent = () => {
    history.push(`/event/${this.props.event.title}/edit`);
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
        <button onClick={e => this.openAuth(e)}>
          Login to join the event!
        </button>
      </div>
    );
  }

  renderAdminButton = () => {
    if(this.props.event.user_id === this.props.auth.user_id) {
      return (
        <div>
          <button onClick={this.editEvent}>Edit Event</button>
          <button onClick={this.openCancel}>Cancel Event</button>
        </div>
        
      )
    }
  }

  getCoords = () => async () => {
    let geocode = await geocodeByAddress(this.props.event.venue)
    let coords = await getLatLng(geocode[0]);
    return coords
  }

  renderMarker = (event) => {
    if(event.coords) {
      let { lat, lng } = event.coords;
      return (
        <div
          className={styles.marker}
          lat={lat}
          lng={lng}
          text="My Marker"
        ></div>
      );
    }
  }

  renderLocation = () => {
    let event = this.props.event;
    if(!event.online) {
      let zoom = 11;
      let center = { lat: 47.66, lng: -122.33 }
      return (
        <div className={styles.outerContainer}>
          <h1>Location</h1>
          <div className={styles.container}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={center}
              defaultZoom={zoom}
            >
              {this.renderMarker(event)}
            </GoogleMapReact>
          </div>
        </div>
      )
    }
  }

  renderDescription = desc => {
    // console.log(desc, desc === 'undefined')
    return desc === 'undefined' ? "description hasn't been added yet" : desc;
  }

  render() {
    let event = this.props.event
    const renderAttendees = event.attendees.map(user => <AttendeeCard key={user.username} user={user} />)
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <img src={`/assets${event.banner_path}`} alt="banner"/>
        </div>
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
            {this.renderAdminButton()}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.descriptionContainer}>
            <p>
              {this.renderDescription(event.description)}
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
  }
)(EventPage)