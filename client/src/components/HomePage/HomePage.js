import React from 'react';
import styles from './HomePage.module.scss';
import { connect } from 'react-redux';
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
          <button>organize an event</button>
        </div>
        <section className={styles.section}>
          <EventCarousel title='Upcoming Tournaments'/>
          <EventCarousel title='Past Tournaments'/>
        </section>
      </div>
    );
  }

}


const mapStateToProps = state => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps, {getAllEvents})(HomePage);