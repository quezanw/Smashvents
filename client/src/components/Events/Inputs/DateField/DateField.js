import React from 'react';
import styles from './DateField.module.scss';
import { Field } from 'redux-form';
import TimeField from "../TimeField/TimeField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateField extends React.Component {
  state = {
    startDate: new Date()
  }
  
  handleChange = date => this.setState({ startDate: date });

  renderDatePicker = ({input, label, type, meta: {active, touched, error, warning } }) => {
    return (
      <div className={`${styles.col} ${styles.dateField}`}>
        <label>{label}</label>
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

  render() {
    let { required } = this.props;
    return (
      <div className={styles.dateTime}>
        <Field 
          name="start_date" 
          type="date" 
          label="Start Date" 
          component={this.renderDatePicker}
          onChange={this.handleChange}
          validate={[required]}
          />
        <TimeField required={required}/>
      </div>
    );
  }
}

export default DateField;