import React from 'react'
import styles from './TimeField.module.scss';
import { Field } from 'redux-form';

const TimeField = props => {
  const { required } = props;

  const renderTime = ({input, label, type, meta: {active, touched, error, warning }}) => {
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

  return (
    <div className={styles.timeField}>
      <Field 
        name="start_time" 
        type="time" 
        label="Start Time" 
        component={renderTime}
        validate={[required]}
      />
      <Field 
        name="end_time" 
        type="time" 
        label="End Time" 
        component={renderTime}
      />
    </div>
  )
}

export default TimeField;