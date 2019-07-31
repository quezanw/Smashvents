import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/index';
import styles from './Sidebar.module.scss';
import history from '../../history';

import EventForm from '../EventForm/EventForm';

class Sidebar extends React.Component {
  
  openModal(e, config) {
    e.preventDefault();
    this.props.openModal(config)
  }

  render() {
    let loginModalConfig = {
      content: <EventForm/>
    }
    return (
      <div className={styles.sidebar}>
        <button onClick={(e) => history.push('/')}className={styles.home}>HOME</button>
        <button className={styles.login} onClick={(e) => this.openModal(e, loginModalConfig)}>L/R</button>
      </div>
    );
  }
}

export default connect(null, { openModal })(Sidebar);