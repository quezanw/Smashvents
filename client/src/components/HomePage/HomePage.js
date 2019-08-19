import React from 'react';
import styles from './HomePage.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../actions/index';
import EventCarousel from '../EventCarousel/EventCarousel';
// import ClipLoader from 'react-spinners/ClipLoader';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllEvents();
  }

  render() {
    let upcoming = this.props.events.filter(e => new Date(e.start_date) - new Date() >= 0);
    let past = this.props.events.filter(e => new Date(e.start_date) - new Date() < 0);
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>SMASHVENTS</h1>
          <Link className={styles.btn} to="/event/create">Organize an event</Link>
        </div>
        <section className={styles.eventsSection}>
          <EventCarousel events={upcoming} title='Upcoming Tournaments' carouselID='carousel-list1'/>
          <EventCarousel events={past} title='Past Tournaments' carouselID='carousel-list2'/>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.events,
  }
}

export default connect(mapStateToProps, {getAllEvents})(HomePage);