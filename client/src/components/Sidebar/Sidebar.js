import React from 'react';
import { connect } from 'react-redux';
import { openModal, logout } from '../../actions/index';
import styles from './Sidebar.module.scss';
import history from '../../history';
import Auth from '../Auth/Auth';

class Sidebar extends React.Component {
  
  openModal = e => {
    e.preventDefault();
    let modalConfig = {
      content: <Auth/>
    }
    this.props.openModal(modalConfig)
  }

  logout = () => {
    this.props.logout();
  }

  renderLogin = () => {
    if(this.props.auth.isSignedIn) {
      return <button className={styles.login} onClick={this.logout}>Logout</button>
    }
    return <button className={styles.login} onClick={e => this.openModal(e)}>Login</button>;
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <button onClick={(e) => history.push('/')}className={styles.home}>HOME</button>
        {this.renderLogin()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { openModal, logout })(Sidebar);