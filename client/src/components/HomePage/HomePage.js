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
          <EventCarousel events={this.props.events} title='Upcoming Tournaments' carouselID='carousel-list1'/>
          {/* <EventCarousel title='Past Tournaments' carouselID='carousel-list2'/> */}
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