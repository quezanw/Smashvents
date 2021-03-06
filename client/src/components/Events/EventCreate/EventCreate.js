import React from 'react';
import { connect } from 'react-redux';
import { createEvent, clearVenue } from '../../../actions/index';
import EventForm from '../EventForm/EventForm';
import Auth from '../../Auth/Auth';
import styles from './EventCreate.module.scss';

class EventCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createEvent(formValues);
  }

  renderError = () => {
    let error = this.props.error;
    if(error) {
      return (
        <p className={styles.error}>{error}</p>
      );
    }
  }

  renderCreateEvent = () => {
    let initialValues = {
      online: 'true',
      banner_path: '/banner1.jpg',
      icon_path: '/event_icon1.png'
    }
    if(this.props.isSignedIn) {
      return (
        <div className={styles.eventWrapper}>
          <div className={styles.header}>
            Create A New Event
          </div>
          {this.renderError()}
          <EventForm 
            // clearVenue={this.props.clearVenue} 
            initialValues={initialValues} 
            error={this.props.error} 
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
    return (
      <div className={styles.authWrapper}>
        <h1>Login Required.</h1>
        <p>You must be logged in to view this page.</p>
        <div className={styles.auth}>
          <Auth />
        </div>
      </div>
    );
  }

  render() {
    return this.renderCreateEvent();
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    error: state.events.eventError
  }
}

export default connect(mapStateToProps, { createEvent, clearVenue })(EventCreate);