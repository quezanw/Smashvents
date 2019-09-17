import React from 'react'
import styles from './ImagesContainer.module.scss';

const ImagesContainer = props => {
  let { title, images } = props;
  return (
    <div className={styles.imagesWrapper}>
      <p className={styles.label}>{title}</p>
      <div className={styles.images}>
        {images}
      </div>
    </div>
  );
}

export default ImagesContainer;