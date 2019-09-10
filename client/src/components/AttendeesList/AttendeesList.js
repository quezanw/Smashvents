import React from 'react';
import styles from './AttendeesList.module.scss';
import { connect } from 'react-redux';
import { fetchAttendeeList } from '../../actions/index';
import AttendeeCard from '../AttendeeCard/AttendeeCard';


class AttendeesList extends React.Component {
  state = { 
    currentPage: 1,
    search: ''
  }

  componentDidMount() {
    this.props.fetchAttendeeList(this.props.event.event_id, 1)
  }

  renderAttendees = user => {
    return (
      <div key={user.username} className={styles.row}>
        <AttendeeCard user={user} />
      </div>
    );
  }

  nextPage = () => {
    let page = this.state.currentPage + 1;
    this.setState({currentPage: page});
    this.props.fetchAttendeeList(this.props.event.event_id, page)
  }

  prevPage = () => {
    let page = Math.max(this.state.currentPage - 1, 1);
    this.setState({currentPage: page});
    this.props.fetchAttendeeList(this.props.event.event_id, page)
  }

  render() {
    const list = this.props.event.page.map(this.renderAttendees);
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Attendees
        </div>
        <div className={styles.searchWrapper}>
          <input 
            className={styles.search} 
            placeholder='search player' 
            type="text"
          />
        </div>
        <div className={styles.listWrapper}>
          <div className={styles.subHeader}>
            <h1>Attendees</h1>
            <button>v</button>
          </div>
          <div>
            {list}
          </div>
          <div className={styles.footer}>
            <div className={styles.pageControls}>
              <button onClick={this.prevPage}>prev page</button>
              <p>{this.state.currentPage}</p>
              <button onClick={this.nextPage}>next page</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    event: state.selectedEvent
  }
}
export default connect(mapStateToProps, { fetchAttendeeList })(AttendeesList);