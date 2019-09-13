import React from 'react';
import styles from './EventSearch.module.scss';
import EventItemLong from '../EventItemLong/EventItemLong';
import { connect } from 'react-redux';

class EventSearch extends React.Component {
  state = {
    events: [],
    filtered_events: [],
    page: [],
    currentPage: 1,
    max: 1,
    searchVal: '',
    prev: true,
    next: true,
  };

  componentDidMount() {
    let { events } = this.props;
    let max = Math.floor(events.length / 10);
    this.setState({
      events,
      page: events.slice(0,10),
      max,
      next: 1 > max,
    });
  }

  changePage = page => {
    let { filtered_events, events } = this.state;
    let list = filtered_events.length > 0 ? filtered_events : events;
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

  sortEvents = val => {
    let filtered_events = this.props.events.filter(event => { 
      return event.title.toLowerCase().includes(val.toLowerCase())
    });
    let max = Math.floor(filtered_events.length / 10);
    this.setState({
      filtered_events,
      page: filtered_events.slice(0,10),
      currentPage: 1, 
      max,
      next: 1 > max,
      prev: true,
    });
  }

  handleSearch = e => {
    let val = e.target.value;
    this.setState({ searchVal: val }, () => this.sortEvents(val));
  }

  renderEvent = event => {
    return (
      <div key={event.event_id} className={styles.row}>
        <EventItemLong event={event}/>
      </div>
    )
  }

  render() {
    const renderEvents = this.state.page.map(this.renderEvent)
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>Event Search</div>
        <div className={styles.searchWrapper}>
          <input 
            onChange={this.handleSearch}
            className={styles.search} 
            placeholder='search events' 
            type="text"
            value={this.state.searchVal}
          />
        </div>
        <div className={styles.container}>
          {renderEvents}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.events
  }
}

export default connect(mapStateToProps, {})(EventSearch);

