import React from 'react';
// import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form';
import styles from './EventForm.module.scss';
import DatePicker from "react-datepicker";
import LocationSearch from '../Inputs/LocationSearch/LocationSearch';

// import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";


class EventForm extends React.Component {
  state = { online: this.props.initialValues.online == 'true' ? 'true' : 'false', startDate: new Date() }

  // componentWillMount() {
  //   let script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
  //   document.head.append(script);
  // }

  onSubmit = formValues => {
    let date = formValues.start_date;
    formValues.start_date = new Date(date);
    this.props.onSubmit(formValues);
  }

  onRadioChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ online: e.currentTarget.value});
    }
  }

  handleChange = date => this.setState({ startDate: date });

  renderError = () => this.props.error ? <p>{this.props.error}</p> : '';
  
  required = value => value ? undefined : 'Required';

  renderInput = ({ input, label, type, meta: {active, touched, error, warning} }) => {
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {touched && (
          (error && <span className={styles.error}>{error}</span>) 
          || (warning && <span>{warning}</span>)
        )}
      </div>
    );
  };

  renderRadioInput = ({ input, label, meta, type}) => {
    return (
      <div className={styles.radio}>
        <input 
          {...input}
          type="radio" 
          value={input.value}
          checked={this.state.online === input.value ? true : false}
        />
        <label>{label}</label>
      </div>
    );
  };

  renderTextarea = ({input, label, meta}) => {
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <textarea className={styles.textarea} {...input}  autoComplete="off" />
      </div>
    );
  }

  renderTime = ({input, label, type, meta: {active, touched, error, warning }}) => {
    return (
      <div className={styles.col}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {touched && (
          (error && <span className={styles.error}>{error}</span>) 
          || (warning && <span>{warning}</span>)
        )}
      </div>
    );
  }

  renderDatePicker = ({input, label, type, meta: {active, touched, error, warning } }) => {
    return (
      <div className={styles.col}>
        <label>{label}</label>
        {/* <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} /> */}
        <DatePicker
          {...input}
          dateForm="MM/DD/YYYY"
          selected={this.state.startDate}
          onChange={input.onChange}
          minDate={new Date()}
          type={type}
        />
          {touched && (
          (error && <span className={styles.error}>{error}</span>) 
          || (warning && <span>{warning}</span>)
        )}
      </div>
    );
  }

  renderVenue = () => {
    let offline = this.state.online;
    if(offline === 'false') {
      return (
        <Field 
          name="venue" 
          type="text" 
          label="Venue" 
          component={LocationSearch}
          validate={[this.required]}
        />
      )
    }
  }

  render() {
    return (
      <div className={styles.formContainer}>
        {/* {this.renderError()} */}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field 
            name="title" 
            type="text" 
            label="Event Name" 
            component={this.renderInput}
            validate={[this.required]}
          />
          <Field 
            name="description" 
            type="text" 
            label="Description" 
            component={this.renderTextarea}
          />
          <Field 
            name="ruleset" 
            type="text" 
            label="Ruleset" 
            component={this.renderInput}
          />
          <div className={styles.radioWrapper}>
            <p>Online / Offline</p>
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
          <div className={styles.dateTime}>
            <Field 
              name="start_date" 
              type="date" 
              label="Start Date" 
              component={this.renderDatePicker}
              onChange={this.handleChange}
              validate={[this.required]}
              />
            <Field 
              name="start_time" 
              type="time" 
              label="Start Time" 
              component={this.renderTime}
              validate={[this.required]}
            />
            <Field 
              name="end_time" 
              type="time" 
              label="End Time" 
              component={this.renderTime}
            /> 
          </div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'eventForm'})(EventForm);

