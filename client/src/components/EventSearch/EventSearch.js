import React from 'react';
import styles from './EventSearch.module.scss';
import EventItemLong from '../EventItemLong/EventItemLong';
import { connect } from 'react-redux';

class EventSearch extends React.Component {
  state = {
    
  };

  componentDidMount() {

  }

  render() {
    const renderEvents = this.props.events.map(event => {
      return (
        <div className={styles.row}>
          <EventItemLong event={event}/>
        </div>
      )
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>Event Search</div>
        <div className={styles.searchWrapper}>
          <input 
            className={styles.search} 
            placeholder='search events' 
            type="text"
          />
        </div>
        <div className={styles.container}>
          {renderEvents}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.events
  }
}

export default connect(mapStateToProps, {})(EventSearch);

