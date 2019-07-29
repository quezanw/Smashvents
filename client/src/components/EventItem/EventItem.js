import React from 'react';

import styles from './EventItem.module.scss';


class EventItem extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div >
                This is an Event Item {this.props.item}
            </div>
        );
    }
}

export default EventItem;