import React from 'react';
// import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form';
import styles from './EventForm.module.scss';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: 'online', startDate: new Date() }
  }

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

  onChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ checked: e.currentTarget.value});
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
          type={type} 
          value={input.value}
          // checked={this.state.checked === 'online'}
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

  renderTime2 = ({input, label, meta, type}) => {
    return (
      <div className={styles.col}>
        <label>{label}</label>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          // excludeDates={[]}
          minDate={new Date()}
        />
        {/* {this.renderError(meta)} */}
      </div>
    );
  }

  renderVenue = () => {
    let offline = this.state.checked === 'offline';
    if(offline) {
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
    console.log(this.props)
    return (
      <div className={styles.formContainer}>
        {this.renderError()}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="title" type="text" label="Event Name" component={this.renderInput} />
          <Field name="description" type="text" label="Description" component={this.renderTextarea}/>
          <Field name="ruleset" type="text" label="Ruleset" component={this.renderInput}/>
          <div className={styles.radioWrapper}>
            <p>Online / Offline</p>
            <Field 
              name="online" 
              value="online" 
              type="radio" 
              label="Online" 
              component={this.renderRadioInput}
              onChange={this.onChange} 
            />
            <Field 
              name="online" 
              value="offline" 
              type="radio" 
              label="Offline" 
              component={this.renderRadioInput}
              onChange={this.onChange} 
            />
          </div>

          {this.renderVenue()}
          <div className={styles.date_time}>
            <Field name="start_date" type="date" label="Start Date" component={this.renderTime2}/>
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

