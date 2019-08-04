import React from 'react';
import { connect } from 'react-redux';

import styles from './EventPage.module.scss';

class EventPage extends React.Component {
  
  render() {
    return (
      <div className={styles.wrapper}>
          {this.props.event.title}
          {this.props.event.start_date}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.selectedEvent
  }
}

export default connect(mapStateToProps, {})(EventPage)