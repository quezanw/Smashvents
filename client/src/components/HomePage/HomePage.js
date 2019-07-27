import React from 'react';
import styles from './HomePage.module.scss';

import EventCarousel from '../EventCarousel/EventCarousel';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>SMASHVENTS</h1>
        <button>organize an event</button>
      </div>
      <section className={styles.section}>
        <EventCarousel/>
      </section>
    </div>

  );
}

export default HomePage;