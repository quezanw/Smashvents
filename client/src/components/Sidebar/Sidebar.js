import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/index';
import styles from './Sidebar.module.scss';
import history from '../../history';
import Auth from '../Auth/Auth';

class Sidebar extends React.Component {
  
  openModal = e => {
    console.log('ping sidebar')
    e.preventDefault();
    let modalConfig = {
      content: <Auth/>
    }
    this.props.openModal(modalConfig)
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <button onClick={(e) => history.push('/')}className={styles.home}>HOME</button>
        <button className={styles.login} onClick={e => this.openModal(e)}>L/R</button>
      </div>
    );
  }
}

export default connect(null, { openModal })(Sidebar);