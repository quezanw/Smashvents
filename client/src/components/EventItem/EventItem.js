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

  render() {
    let event = this.props.event;
    let src = `/assets${event.banner_path}`;
    return (
      <div onClick={() => this.selectEvent(event)} className={styles.item}>
        <div className={styles.imgContainer}>
          <img src={src} alt="banner" />
        </div>
        <div className={styles.details}>
          <p className={styles.title}>{event.title}</p>
          <p>{moment(event.start_date).format('MMM Do YYYY')}</p>
          {/* <p>{m.format(event.start_time,'hh:mm a')}</p> */}
          <p>{event.online ? 'Online' : 'Offline'}</p>
        </div>
      </div>
    );
  }
}

export default connect(null, { selectEvent })(EventItem);