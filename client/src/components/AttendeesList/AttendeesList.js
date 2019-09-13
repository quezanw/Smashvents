import React from 'react';
import styles from './AttendeesList.module.scss';
import { connect } from 'react-redux';
import { fetchAttendeeList } from '../../actions/index';
import AttendeeCard from '../AttendeeCard/AttendeeCard';


class AttendeesList extends React.Component {
  state = { 
    attendees: [],
    filtered_attendees: [],
    page: [],
    currentPage: 1,
    max: 1,
    searchVal: '',
    prev: true,
    next: true,
  }

  componentDidMount() {
    let { attendees } = this.props.event;
    let max = Math.floor(attendees.length / 10);
    this.setState({
      attendees,
      page: attendees.slice(0,10),
      max,
      next: 1 > max,
    });
  }

  renderAttendee = user => {
    return (
      <div key={user.username} className={styles.row}>
        <AttendeeCard user={user} />
      </div>
    );
  }

  changePage = page => {
    let { filtered_attendees, attendees } = this.state;
    let list = filtered_attendees.length > 0 ? filtered_attendees : attendees;
    let start = (page - 1) * 10;
    let end = page * 10;
    this.setState({
      page: list.slice(start, end),
      currentPage: page, 
      next: page > this.state.max,
      prev: page === 1
    });
  }

  nextPage = () => this.changePage(this.state.currentPage + 1);

  prevPage = () => this.changePage(Math.max(this.state.currentPage - 1, 1));

  sortAttendees = val => {
    let filtered_attendees = this.props.event.attendees.filter(user => { 
      return user.username.toLowerCase().includes(val);
    });
    let max = Math.floor(filtered_attendees.length / 10);
    this.setState({
      filtered_attendees,
      page: filtered_attendees.slice(0,10),
      currentPage: 1, 
      max,
      next: 1 > max,
      prev: true,
    });
  }

  handleSearch = e => {
    let val = e.target.value;
    this.setState({ searchVal: val }, () => this.sortAttendees(val));
  }


  render() {
    const renderList = this.state.page.map(this.renderAttendee);
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Attendees
        </div>
        <div className={styles.searchWrapper}>
          <input 
            onChange={this.handleSearch}
            className={styles.search} 
            placeholder='search player' 
            type="text"
            value={this.searchVal}
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
            {renderList}
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