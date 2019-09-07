import React from 'react'
import styles from './VenueMap.module.scss';
import GoogleMapReact from 'google-map-react';
import ClipLoader from 'react-spinners/ClipLoader';
import Marker from '../Marker/Marker';

const VenueMap = props => {
  let { online, coords } = props.event;
  if(!online) {
    if(coords) {
      let center = { lat: coords.lat, lng: coords.lng }
      let zoom = 12;
      return (
        <div className={styles.largeOuterContainer}>
          <h1>Location</h1>
          <div className={styles.container}>
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