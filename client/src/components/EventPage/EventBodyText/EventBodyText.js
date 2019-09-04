import React from 'react'
import styles from './EventBodyText.module.scss';

const EventBodyText = props => {
  let bodyText = props.bodyText;
  return (
    <div className={styles.largeTextContainer}>
      <p>
        {bodyText === 'undefined' ? "description hasn't been added yet" : bodyText}
      </p>
    </div>  
  );
}

export default EventBodyText;
