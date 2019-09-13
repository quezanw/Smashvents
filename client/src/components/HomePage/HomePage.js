import React from 'react';
import styles from './HomePage.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../actions/index';
import EventCarousel from '../EventCarousel/EventCarousel';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAllEvents();
  }

  render() {
    let events = this.props.events;
    let upcoming = events.filter(e => new Date(e.start_date) - new Date() >= 0).sort((a,b) => {
      return a.start_date > b.start_date;
    });
    let past = events.filter(e => new Date(e.start_date) - new Date() < 0);
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>SMASHVENTS</h1>
          <div className={styles.line}></div>
          <p>Empowering your local smash community</p>
          <div className={styles.btnContainer}>
            <Link className={styles.btn} to="/event/create">Organize an event</Link>
            <Link className={styles.btnHollow} to="/event/search">Find an event</Link>
          </div>
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