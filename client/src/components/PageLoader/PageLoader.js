import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './PageLoader.module.scss';

const PageLoader = () => {
    return (
      <div className={styles.loaderWrapper}>
        <BeatLoader
        sizeUnit={"px"}
        size={75}
        color={'#36D7B7'}
        loading={true}
        />
      </div>
    );
}

export default PageLoader;