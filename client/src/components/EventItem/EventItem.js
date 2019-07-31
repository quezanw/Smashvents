import React from 'react';
import { connect } from 'react-redux';
import { selectEvent } from '../../actions/index';
import styles from './EventItem.module.scss';
import history from '../../history';

class EventItem extends React.Component {
  constructor(props) {
    super();
  }

  selectEvent(event) {
    this.props.selectEvent(event);
    history.push(`/event/${event.title}/details`);
  }

  render() {
    let event = this.props.event;
    return (
      <div onClick={() => this.selectEvent(event)} className={styles.item}>
          <p>{event.title}</p>
          <p>{event.start_date}</p>
          <p>{event.online ? 'Online' : 'Offline'}</p>
      </div>
    );
  }
}

export default connect(null, { selectEvent })(EventItem);