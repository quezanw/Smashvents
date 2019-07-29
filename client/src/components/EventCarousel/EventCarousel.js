import React from 'react';
import { connect } from 'react-redux';
import styles from './EventCarousel.module.scss';
import EventItem from '../EventItem/EventItem';



class EventCarousel extends React.Component {
  constructor(props) {
    super();
  }

  nextSibling(el) {
    let list = document.getElementById('carousel-list').childNodes;
    return el.nextSibling === null ? list[0] : el.nextSibling;
  }
  
  slideRight(event) {
    event.preventDefault();
    let carousel = document.getElementById('carousel-list');
    let events = carousel.childNodes;
    let currentSeat = document.querySelector('.is-ref');
    currentSeat.classList.remove('is-ref');
    let seat = this.nextSibling(currentSeat);
    seat.classList.add('is-ref');
    seat.style.order = 1;
    for(let i = 2; i <= events.length; i++) {
      this.nextSibling(seat).style.order = i;
      seat = this.nextSibling(seat);
    }
    let carouselList = document.getElementById('carousel-list')
    carouselList.removeAttribute('style');
    return setTimeout(function() {
      return carouselList.setAttribute('style', 'transform: none; transition: transform 0.25s linear;')
    }, 1);
  
  }

  slideLeft(event) {
    event.preventDefault();
    let list = document.getElementById('carousel-list');
    let position = list.getBoundingClientRect().left;
    list.style.left = position + 325 + 'px';
  }


  render() {
    let items = [1,2,3,4,5,6,7,8,9,10];
    const renderEvents = items.map(item => {
      if(item === 10) {
        return ( 
          <li key={item} style={{order: 1}} className={`${styles.item} item is-ref`}>
            <EventItem item={item}/>
          </li>
        );
      }
      return (
        <li key={item} style={{order: 2}} className={`${styles.item} item`}>
          <EventItem item={item}/>
        </li>
      );
    })
    let setStyle = {  
      transform: 'none',
      transition: 'transform .25s linear',
    }
    return (
      <div className={styles.carouselContainer}>       
        <div className={styles.carouselHeader}>
         <h2>{this.props.title}</h2>
         <div className={styles.carouselBtns}>
           <button onClick={(event) => this.slideLeft(event)}>left</button>
           <button onClick={(event) => this.slideRight(event)}>right</button>
         </div>
        </div>
        <div className={styles.carousel}>
          <ul style={setStyle} id='carousel-list' className={styles.list}>
            {renderEvents}
          </ul>
        </div>
      </div>
    );
  }

}


const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(EventCarousel);