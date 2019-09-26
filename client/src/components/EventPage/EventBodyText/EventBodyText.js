import React from 'react'
import styles from './EventBodyText.module.scss';
import MarkdownPane from '../../MarkdownPane/MarkdownPane';

const EventBodyText = props => {

  const renderBody = (bodyText, title) => {
    if(bodyText === 'undefined' || bodyText.length < 1) {
      return <p className={styles.card}>{title} hasn't been added yet</p>
    }
    return <MarkdownPane md={bodyText} width="auto" height="auto" padding="2rem"/>
  }
  let { bodyText, title } = props;
  return (
    <div className={styles.largeTextContainer}>
      {renderBody(bodyText, title)}
    </div>  
  );
}

export default EventBodyText;
