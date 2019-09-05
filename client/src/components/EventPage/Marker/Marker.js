import React from 'react'
import styles from './Marker.module.scss';

class Marker extends React.Component {
  render() {
    return (
      <i 
        className={`${styles.marker} fas fa-map-marker-alt`}
        lat={this.props.lat}
        lng={this.props.lng}
        text="My Marker">
      </i>
    );
  }
}

export default Marker;