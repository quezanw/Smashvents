import React from 'react';
import styles from './AttendeesList.module.scss';
import { connect } from 'react-redux';


class AttendeesList extends React.Component {
  

  render() {
    return (
      <div>
        THIS IS THE ATTENDEES LIST
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    attendees: state
  }
}
export default connect(null)(AttendeesList);