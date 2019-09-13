import React from 'react';
import { connect } from 'react-redux';
import { selectEvent } from '../../actions/index';
import styles from './EventItemLong.module.scss';
import history from '../../history';
import moment from 'moment';

class EventItemLong extends React.Component {

  selectEvent = event => {
    this.props.selectEvent(event);
    history.push(`/event/${event.title}/details`);
  }

  render() {
    let { event } = this.props;
    let src = `/assets${event.banner_path}`;
    return (
      <div className={styles.wrapper}>
        <div onClick={() => this.selectEvent(event)} className={styles.imgContainer}>
          <img className={styles.img} src={src} alt="event banner"/>
        </div>
        <div className={styles.detailsContainer}>
          <p onClick={() => this.selectEvent(event)} className={styles.title}>{event.title}</p>
          <p>{moment(event.start_date).format('MMM Do YYYY')}</p>
          <p>{event.online ? 'Online' : 'Offline'}</p>
          <p>{event.count} Attendees</p>
        </div>
      </div>
    );
  }
}

export default connect(null, { selectEvent })(EventItemLong);

