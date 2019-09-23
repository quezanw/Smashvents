import React from 'react';
import { Field } from 'redux-form';
import LocationSearch from '../LocationSearch/LocationSearch';
import styles from './OnlineOffline.module.scss';

class OnlineOffline extends React.Component {
  state = { 
    online: this.props.initialValues.online ? 'true' : 'false',
  }

  onRadioChange = e => {
    if(e.currentTarget.checked) {
      // if(e.currentTarget.value === 'true') {
      //   this.props.clearVenue();
      // }
      this.setState({ online: e.currentTarget.value});
    }
  }

  renderRadioInput = ({ input, label, meta, type}) => {
    return (
      <div className={styles.radio}>
        <label>
          <input 
            {...input}
            type="radio" 
            value={input.value}
            checked={this.state.online === input.value}
          />
          {label}
        </label>
      </div>
    );
  };

  renderVenue = () => {
    let offline = this.state.online;
    let { initialValues } = this.props;
    if(offline === 'false') {
      return (
        <Field 
          name="venue" 
          type="text" 
          label="Venue" 
          value={initialValues.venue ? initialValues.venue : ''}
          component={LocationSearch}
          validate={[this.props.required]}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <div className={styles.radioWrapper}>
          <p className={styles.subHeader}>Online / Offline</p>
          <Field 
            name="online" 
            value={'true'}
            type="radio" 
            label="Online" 
            component={this.renderRadioInput}
            onChange={this.onRadioChange}
          />
          <Field 
            name="online" 
            value={'false'} 
            type="radio" 
            label="Offline" 
            component={this.renderRadioInput}
            onChange={this.onRadioChange} 
          />
        </div>
        {this.renderVenue()}
      </div>
    );
  }
}

export default OnlineOffline;