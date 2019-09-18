import React from 'react';
import styles from './EventIcon.module.scss';
import { Field } from 'redux-form';
import ImagesContainer from '../ImagesContainer/ImagesContainer';

class EventIcon extends React.Component {
  state = { event_icon: this.props.initialValues.icon_path }

  onIconChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ event_icon: e.currentTarget.value});
    }
  }

  renderEventIcon = ({ input }) => {
    return (
      <div>
        <label>
          <input
            {...input}
            type="radio" 
            value={input.value}
            checked={this.state.event_icon === input.value}
          />
          <img className={styles.eventIcon} src={`/assets${input.value}`} alt="icon"/>
        </label>
      </div>
    );
  }

  render() {
    let icons = [1,2,3,4,5];
    const eventIcons = icons.map(val => {
      return (
        <Field
          key={val}
          name="icon_path"
          type="radio"
          component={this.renderEventIcon}
          value={`/event_icon${val}.png`} 
          onChange={this.onIconChange}
        />
      );
    })
    return (
      <ImagesContainer images={eventIcons} title='Event Icons'/>
    )
  }
}

export default EventIcon;