import React from 'react';
import styles from './Topbar.module.scss';
import history from '../../history';

class Topbar extends React.Component {
  toggleSidebar = (e) => {
    e.preventDefault();
    document.getElementById('sidebar').style.visibility = 'visible';
    document.getElementById('sidebar').style.opacity = 1;
  }

  goHome = () => {
    history.push('/');
  }

  render() {
    return (
      <div className={styles.topbar}>
        <i onClick={this.toggleSidebar} className={`${styles.menu} fas fa-bars`}></i>
        <h1 onClick={this.goHome}>SMASHVENTS</h1>
      </div>
    );
  }
}

export default Topbar;