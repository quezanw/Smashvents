import React from 'react';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../actions/index';
import styles from './CancelEvent.module.scss';

class CancelEvent extends React.Component {
  
  cancelEvent = () => {
    this.props.deleteEvent(this.props.event.event_id);
  }

  render() {
    let event = this.props.event;
    return (
        <div className={styles.wrapper}>
          <h1>Are you sure you want to cancel this event?</h1>
          <p>{event.title}</p>
          <button onClick={this.cancelEvent}>Cancel Event</button>
        </div>
    );
  }
}

export default connect(null, { deleteEvent })(CancelEvent);

