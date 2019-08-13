import React from 'react';
import { connect } from 'react-redux';
import styles from './AttendeeCard.module.scss';

class AttendeeCard extends React.Component {

  render() {
    let user = this.props.user;
    return ( 
      <div className={styles.wrapper}>
        <div className={styles.playerIcon}></div>
        <div className={styles.playerDetails}>
          <p className={styles.username}>
          {user.username}
          </p>
          <p className={styles.fullname}>
            {user.first_name} {user.last_name}
          </p>
        </div>
      </div>
    );
  }

}

// const mapStateToProps = state => {

// }

export default connect(null)(AttendeeCard)