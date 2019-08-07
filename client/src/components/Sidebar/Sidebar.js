import React from 'react';
import { connect } from 'react-redux';
import { openModal, logout } from '../../actions/index';
import styles from './Sidebar.module.scss';
import history from '../../history';
import Auth from '../Auth/Auth';

class Sidebar extends React.Component {
  
  openModal = e => {
    e.preventDefault();
    this.props.openModal({ content: <Auth/> })
  }

  logout = () => this.props.logout();

  renderLogin = () => {
    if(this.props.auth.isSignedIn) {
      return (
        <div onClick={this.logout} className={styles.login_wrapper}>
          <i className={`${styles.logout} fas fa-sign-out-alt`}></i>
          <p>Logout</p>
       </div>
      );
    }
    return (
      <div onClick={e => this.openModal(e)} className={styles.login_wrapper}>
        <i className={`${styles.login} fas fa-sign-in-alt`}></i>
        <p>Login</p>
      </div>
    ) 
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <i className={`${styles.home} fas fa-home`} onClick={() => history.push('/')}></i>
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