import React from 'react';
import styles from './AttendeesList.module.scss';
import { connect } from 'react-redux';
import { fetchAttendeeList } from '../../actions/index';
import AttendeeCard from '../AttendeeCard/AttendeeCard';


class AttendeesList extends React.Component {
  state = { 
    currentPage: 1,
    search: '',
    prev: true,
    next: (this.props.event.totalAttendees <= 15)
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
    let total = this.props.event.totalAttendees;
    let page = this.state.currentPage + 1;
    this.setState({
      currentPage: page, 
      next: total <= 15 * page, 
      prev: page === 1
    });
    this.props.fetchAttendeeList(this.props.event.event_id, page)
  }

  prevPage = () => {
    let total = this.props.event.totalAttendees;
    let page = Math.max(this.state.currentPage - 1, 1);
    this.setState({
      currentPage: page, 
      next: total <= 15 * page, 
      prev: page === 1
    });
    this.props.fetchAttendeeList(this.props.event.event_id, page)
  }

  render() {
    let event = this.props.event;
    const list = event.page.map(this.renderAttendees);
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
            <button className={styles.btnSort}>
              <i className="fas fa-sort-down"></i>
            </button>
          </div>
          <div>
            {list}
          </div>
          <div className={styles.footer}>
            <div className={styles.pageControls}>
              <button className={styles.btn} disabled={this.state.prev} onClick={this.prevPage}>
                <i className="far fa-caret-square-left"></i> 
              </button>
              <p>{this.state.currentPage}</p>
              <button className={styles.btn} disabled={this.state.next} onClick={this.nextPage}>
              <i className="far fa-caret-square-right"></i>
              </button>
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