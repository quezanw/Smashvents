import React from 'react';
import { connect } from 'react-redux';
import { selectEvent } from '../../actions/index';
import styles from './EventItem.module.scss';
import history from '../../history';
import moment from 'moment';

class EventItem extends React.Component {

  selectEvent = event => {
    this.props.selectEvent(event);
    history.push(`/event/${event.title}/details`);
  }

  convertDate = date => {
    let ts = new Date();
    // ${ts.toLocaleTimeString(date)} insert for time start input field
    return `${ts.toDateString(date)}`
  }

  render() {
    let event = this.props.event;
    return (
      <div onClick={() => this.selectEvent(event)} className={styles.item}>
        <div className={styles.img_container}></div>
        <div className={styles.details}>
          <p className={styles.title}>{event.title}</p>
          <p>{this.convertDate(event.start_date)}</p>
          {/* <p>{m.format(event.start_time,'hh:mm a')}</p> */}
          <p>{event.online ? 'Online' : 'Offline'}</p>
        </div>
      </div>
    );
  }
}

export default connect(null, { selectEvent })(EventItem);