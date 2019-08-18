import React from 'react';
import { connect } from 'react-redux';
import EventForm from '../EventForm/EventForm';
import { editEvent } from '../../../actions/index';
import moment from 'moment';

import styles from './EventEdit.module.scss'

class EventEdit extends React.Component {

  onSubmit = formValues => {
    this.props.editEvent(formValues);
  }

  renderError = () => {
    let error = this.props.error;
    if(error) {
      return (
        <p className={styles.error}>{error}</p>
      );
    }
  }

  formatFormValues = event => {
    let start_date = moment(event.start_date, "YYYY-MM-DD").format('MM/DD/YYYY');
    let description = event.description === 'undefined' ? '' : event.description;
    let ruleset = event.ruleset === 'undefined' ? '' : event.ruleset;
    // let start_time = moment(event.start_time, "hh:mm:ss").format('hh:mm a');
    return {...event, start_date, description, ruleset}
  }

  render() {
    let event = this.props.event;
    return ( 
      <div className={styles.wrapper}>
          <div className={styles.header}>
            Edit Event
          </div>
          {this.renderError()}
          <EventForm 
            clear={this.props.clearVenue} 
            initialValues={this.formatFormValues(event)} 
            error={this.props.error} 
            onSubmit={this.onSubmit}
          />
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    event: state.selectedEvent
  }
}

export default connect(mapStateToProps, { editEvent })(EventEdit)