import React from 'react';
import { connect } from 'react-redux';

import styles from './EventPage.module.scss';

class EventPage extends React.Component {
  render() {
    return (
      <div>
          this is the event view page
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event
  }
}

export default connect(mapStateToProps, {})(EventPage)