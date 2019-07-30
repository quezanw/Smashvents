import React from 'react';

import styles from './EventItem.module.scss';


class EventItem extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        let event = this.props.event;
        return (
            <div className={styles.item}>
                <p>{event.title}</p>
                <p>{event.start_date}</p>
                <p>{event.online ? 'Online' : 'Offline'}</p>
            </div>
        );
    }
}

export default EventItem;