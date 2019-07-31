import React from 'react';

import styles from './EventForm.module.scss';


class EventForm extends React.Component {
  render() {
    return (
      <div>
        <form action="">
          <input type="text" placeholder="email"/>
          <input type="password" placeholder="password"/>
        </form>
      </div>
    );
  }

}

export default EventForm;

