import React from 'react';
import { connect } from 'react-redux';
import Auth from '../Auth/Auth';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import BeatLoader from 'react-spinners/BeatLoader';
import VenueMap from './VenueMap/VenueMap';
import EventHeader from './EventHeader/EventHeader';
import EventBodyText from './EventBodyText/EventBodyText';
import EventAttendees from './EventAttendees/EventAttendees';
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

class EventPage extends React.Component {

  openAuth = () => this.props.openModal({ content: <Auth/> });

  joinEvent = () => this.props.joinEvent(this.props.event.event_id);

  editEvent = () => history.push(`/event/${this.props.event.title}/edit`);

  leaveEvent = () => this.props.leaveEvent(this.props.event.event_id);

  openLeaveEvent = () => {
    let config = {
      confirm: this.leaveEvent,
      header: 'Leave Event',
      message: `Are you sure you want to leave ${this.props.event.title}?`
    }
    this.props.openModal({ content: <ConfirmPopup config={config}/> });
  }

  isAttending = (user_id, attendees) => {
    for(let user of attendees) {
      if(user.user_id === user_id) {
        return true;
      }
    }
    return false;
  }

  renderButton = (style, onClick, text) => {
    return <button className={style} onClick={onClick}>{text}</button>
  }

  renderJoinButton = (auth, attendees) => {
    let { isSignedIn, user_id } = auth;
    const login = this.renderButton(styles.btn, this.openAuth, 'Login to join the event!');
    const leave = this.renderButton(styles.btnLeave, this.openLeaveEvent, 'Leave Event');
    const join = this.renderButton(styles.btn, this.joinEvent, 'Join Event');
    if(!isSignedIn) {
      return login;
    }
    return this.isAttending(user_id, attendees) ? leave : join;
  }

  renderAdminButton = (user_id, host_id) => {
    return user_id === host_id ? this.renderButton(styles.btnEdit, this.editEvent, 'Edit Event') : '';
  }

  renderBodyText = text => {
    if(text || text.length > 1) {
      return <EventBodyText bodyText={text}/>
    }
    return "";
  }
  render() {
    let event = this.props.event;
    let auth = this.props.auth;
    if(event.host) { 
      return (
        <div className={styles.wrapper}>
          <div className={styles.banner}>
            <img src={`/assets${event.banner_path}`} alt="banner"/>
          </div>
          <div className={styles.headerWrapper}>
            <EventHeader event={event} />
            <div className={styles.btnContainer}>
              {this.renderJoinButton(auth, event.attendees)}
              {this.renderAdminButton(auth.user_id, event.user_id)}
            </div>
          </div>
          <div className={styles.bodyLayout}>
            {this.renderBodyText(event.description)}
            {this.renderBodyText(event.ruleset)}
            <EventAttendees attendees={event.attendees} total={event.attendees.length} title={event.title}/>
            <VenueMap event={event}/>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.loaderWrapper}>
        <BeatLoader
          sizeUnit={"px"}
          size={75}
          color={'#36D7B7'}
          loading={true}
        />
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