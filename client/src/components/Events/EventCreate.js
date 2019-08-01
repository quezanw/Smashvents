import React from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/index';
import EventForm from './EventForm/EventForm';

class EventCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createEvent(formValues);
  }


  render() {
    return (
      <div>
        <EventForm test={`this is a test prop`} onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

export default connect(null, { createEvent })(EventCreate);