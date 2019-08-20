import React from 'react'
import styles from './Marker.module.scss';

class Marker extends React.Component {
  render() {
    let {lat, lng} = this.props.coords
    return (
      <i 
        className={`${styles.marker} fas fa-map-marker-alt`}
        lat={lat}
        lng={lng}
        text="My Marker">
      </i>
    );
  }
}

export default Marker;