import React from 'react';
// import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form';
import styles from './EventForm.module.scss';
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";


class EventForm extends React.Component {
  state = { online: 'true', startDate: new Date() }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  renderInput = ({ input, label, meta, type }) => {
    // console.log(input)
    // const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {/* {this.renderError(meta)} */}
      </div>
    );
  };

  onRadioChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ online: e.currentTarget.value});
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  }

  renderRadioInput = ({ input, label, meta, type}) => {
    // const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
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

  renderTime = ({input, label, meta, type}) => {
    return (
      <div className={styles.col}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {/* {this.renderError(meta)} */}
      </div>
    );
  }

  renderDatePicker = ({input, label, meta, type, value}) => {
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
        {/* {this.renderError(meta)} */}
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
          component={this.renderInput}
        />
      )
    }
  }

  renderError = () => this.props.error ? <p>{this.props.error}</p> : '';

  render() {
    return (
      <div className={styles.formContainer}>
        {/* {this.renderError()} */}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="title" type="text" label="Event Name" component={this.renderInput} />
          <Field name="description" type="text" label="Description" component={this.renderTextarea}/>
          <Field name="ruleset" type="text" label="Ruleset" component={this.renderInput}/>
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
          <div className={styles.date_time}>
            <Field 
              name="start_date" 
              type="date" 
              label="Start Date" 
              component={this.renderDatePicker}
              onChange={this.handleChange}
              />
            <Field name="start_time" type="time" label="Start Time" component={this.renderTime}/>
            <Field name="end_time" type="time" label="End Time" component={this.renderTime}/> 
          </div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'eventForm' })(EventForm);

