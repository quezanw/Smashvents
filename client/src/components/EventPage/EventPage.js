import React from 'react';
import { connect } from 'react-redux';
import AttendeeCard from './AttendeeCard/AttendeeCard';
import Auth from '../Auth/Auth';
import GoogleMapReact from 'google-map-react';
import ClipLoader from 'react-spinners/ClipLoader';
import Marker from './Marker/Marker';
import moment from 'moment';
import history from '../../history';
import styles from './EventPage.module.scss';
import 
{ 
  getAttendees, 
  fetchHost, 
  openModal, 
  joinEvent, 
  leaveEvent
} 
from '../../actions/index';
// import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class EventPage extends React.Component {

  openAuth = e => {
    e.preventDefault();
    this.props.openModal({ content: <Auth/> })
  }

  isAttending = (user_id) => {
    for(let user of this.props.event.attendees) {
      if(user.user_id === user_id) return true;
    }
    return false;
  }

  joinEvent = () => this.props.joinEvent(this.props.event.event_id);

  leaveEvent = () => this.props.leaveEvent(this.props.event.event_id);

  editEvent = () => history.push(`/event/${this.props.event.title}/edit`);

  renderJoinButton = () => {
    let auth = this.props.auth;
    if(auth.isSignedIn) {
      if(this.isAttending(auth.user_id)) {
        return (
          <button className={styles.btnLeave} onClick={this.leaveEvent}>
            Leave Event
          </button>
        );
      }
      return (
        <button className={styles.btn} onClick={this.joinEvent}>
          Join Event
        </button>
      );
    }
    return (
      <button className={styles.btn} onClick={e => this.openAuth(e)}>
        Login to join the event!
      </button>
    );
  }

  renderAdminButton = () => {
    if(this.props.event.user_id === this.props.auth.user_id) {
      return (
        <button className={styles.btnEdit} onClick={this.editEvent}>Edit Event</button>
      )
    }
  }

  // getCoords = () => async () => {
  //   let geocode = await geocodeByAddress(this.props.event.venue)
  //   let coords = await getLatLng(geocode[0]);
  //   return coords
  // }

  renderMarker = (event) => {
    if(event.coords) {
      return <Marker coords={event.coords}/>
    }
  }

  renderLocation = () => {
    let event = this.props.event;
    if(!event.online) {
      if(event.coords) {
        let center = { lat: event.coords.lat, lng: event.coords.lng }
        let zoom = 12;
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
      } else {
        return (
          <ClipLoader 
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={true}
          />
        );
      }
    }
 
  }

  renderDescription = desc => {
    // console.log(desc, desc === 'undefined')
    return desc === 'undefined' ? "description hasn't been added yet" : desc;
  }

  render() {
    let event = this.props.event
    let start = moment(event.start_time, 'hh:mm:ss').format('h:mm A')
    let end = moment(event.end_time, 'hh:mm:ss').format('h:mm A')
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
              <div className={styles.row}>
                <div className={styles.col}>
                  <i className={`${styles.detailIcon} fas fa-clock`}></i>
                  <p>{start} - {end}</p>
                </div>
                <div className={styles.col}>
                  <i className={`${styles.detailIcon} fas fa-user`}></i>
                  <p>{event.attendees.length} Attendees</p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col}>
                  <i className={`${styles.detailIcon} fas fa-calendar-alt`}></i>
                  <p>{moment(event.start_date).format('MMM Do YYYY')}</p>
                </div>
                <div className={styles.col}>
                  <i className={`${styles.detailIcon} fas fa-map-marker-alt`}></i>
                  <p>{event.online ? 'Online' : event.venue}</p>
                </div>
                <div className={styles.col}>
                  <i className={`${styles.detailIcon} fas fa-user-tag`}></i>
                  <p>{event.host ? event.host.username : '...loading'}</p>
                </div>
              </div>
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
          <div className={styles.descriptionContainer}>
            <p>
              {this.renderDescription(event.ruleset)}
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