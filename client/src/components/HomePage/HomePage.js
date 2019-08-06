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
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>SMASHVENTS</h1>
          <Link className={styles.btn} to="/event/create">Organize an event</Link>
        </div>
        <section className={styles.events_section}>
          <EventCarousel events={this.props.events} title='Upcoming Tournaments' carouselID='carousel-list1'/>
          <EventCarousel events={this.props.events} title='Past Tournaments' carouselID='carousel-list2'/>
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