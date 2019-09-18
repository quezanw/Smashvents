import React from 'react'
import styles from './EventBodyText.module.scss';

const EventBodyText = props => {
  let { bodyText, title } = props;
  return (
    <div className={styles.largeTextContainer}>
      <p>
        {bodyText === 'undefined' ? `${title} hasn't been added yet` : bodyText}
      </p>
    </div>  
  );
}

export default EventBodyText;
