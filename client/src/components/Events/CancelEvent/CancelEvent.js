import React from 'react';
import { connect } from 'react-redux';
import { deleteEvent } from '../../../actions/index';
import styles from './CancelEvent.module.scss';

class CancelEvent extends React.Component {
  
  cancelEvent = () => {
    this.props.deleteEvent(this.props.event.event_id);
  }

  render() {
    // let event = this.props.event;
    return (
        <div className={styles.wrapper}>
          <div className={styles.header}>Cancel Event</div>
          <div className={styles.content}>
            <h1 className={styles.message}>
              Are you sure you want to cancel this event?
            </h1>
            {/* <p>{event.title}</p> */}
            <div className={styles.btnContainer}>
              <button onClick={this.cancelEvent}>Confirm</button>
            </div>
          </div>

        </div>
    );
  }
}

export default connect(null, { deleteEvent })(CancelEvent);

