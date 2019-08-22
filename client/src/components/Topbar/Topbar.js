import React from 'react';
import styles from './Topbar.module.scss';

class Topbar extends React.Component {
  state = { isDisplayed: false }
  toggleSidebar = (e) => {
    e.preventDefault();
    if(!this.state.isDisplayed)  {
      document.getElementById('sidebar').style.visibility = 'visible';
      document.getElementById('sidebar').style.opacity = 1;
    } else {
      document.getElementById('sidebar').style.visibility = 'hidden';
      document.getElementById('sidebar').style.opacity = 0;
    }
    this.setState({ isDisplayed: !this.state.isDisplayed });
  }
  render() {
    return (
      <div className={styles.topbar}>
        <button onClick={this.toggleSidebar}>show sidebar</button>
      </div>
    );
  }
}

export default Topbar;