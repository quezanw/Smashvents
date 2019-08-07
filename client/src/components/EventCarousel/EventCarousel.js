import React from 'react';
import { connect } from 'react-redux';
import EventItem from '../EventItem/EventItem';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import './EventCarousel.scss';
import styles from './EventCarousel.module.scss';

class EventCarousel extends React.Component {

  render() {
    let state = { galleryItems: this.props.events.map(event => <EventItem event={event}/>)}
    return (
      <div className={styles.carouselContainer}>       
        <div className={styles.carouselHeader}>
          <h2>{this.props.title}</h2>
          <div className={styles.carouselBtns}>
            <i onClick={() => this.Carousel.slidePrev()} className={`${styles.sliderBtn} fas fa-caret-left`}></i>
            <i onClick={() => this.Carousel.slideNext()} className={`${styles.sliderBtn} fas fa-caret-right`}></i>
          </div>
        </div>
        <AliceCarousel
          buttonsDisabled={true}
          dotsDisabled={true}
          items={state.galleryItems}
          responsive={ { 500: { items: 4 } }}
          ref={(el) => (this.Carousel = el)}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {}
// }

export default connect(null)(EventCarousel);