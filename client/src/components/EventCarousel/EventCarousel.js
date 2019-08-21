import React from 'react';
import { connect } from 'react-redux';
import EventItem from '../EventItem/EventItem';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import './EventCarousel.scss';
import styles from './EventCarousel.module.scss';

class EventCarousel extends React.Component {

  render() {
    let responsive = {
      360: {items: 2},
      780: {items: 3},
      1024: {items: 4}
    }
    let state = { galleryItems: this.props.events.map(event => <EventItem event={event}/>)}
    return (
      <div className={styles.carouselContainer}>       
        <div className={styles.carouselHeader}>
          <h2>{this.props.title}</h2>
          <div className={styles.carouselBtns}>
            <button  onClick={() => this.Carousel.slidePrev()} className={styles.btnContainer}>
              <i className={`${styles.sliderBtn} fas fa-angle-left`}></i>
            </button>
            <button onClick={() => this.Carousel.slideNext()} className={styles.btnContainer}>
              <i className={`${styles.sliderBtn} fas fa-angle-right`}></i>
            </button>
          </div>
        </div>
        <AliceCarousel
          buttonsDisabled={true}
          dotsDisabled={true}
          items={state.galleryItems}
          responsive={responsive}
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