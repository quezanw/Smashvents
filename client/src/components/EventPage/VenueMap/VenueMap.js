import React from 'react'
import styles from './VenueMap.module.scss';
import GoogleMapReact from 'google-map-react';
import ClipLoader from 'react-spinners/ClipLoader';
import Marker from '../Marker/Marker';

const VenueMap = props => {
  let { online, coords } = props.event;
  if(!online) {
    if(coords) {
      let directions = `https://www.google.com/maps/dir//${coords.lat},${coords.lng}/@${coords.lat},${coords.lng}17z?hl=en-US`
      let center = { lat: coords.lat, lng: coords.lng }
      let zoom = 12;
      return (
        <div className={styles.largeOuterContainer}>
          <h1>Location</h1>
          <div className={styles.container}>
            <div className={styles.detailsOverlay}>
              <div className={styles.addressDetails}>
                {props.event.venue}
              </div>
              <div className={styles.links}>
                <a href={directions} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-directions"></i>
                  <p>Directions</p>
                </a>
              </div>
            </div>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={center}
              defaultZoom={zoom}
            >
              <Marker lat={coords.lat} lng={coords.lng} /> 
            </GoogleMapReact>
          </div>
        </div>
      )
    }
    return (
      <ClipLoader 
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        loading={true}
      />
    );
  }
  return '';
}

export default VenueMap;