import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from './EventForm.module.scss';
import MarkdownField from '../Inputs/MarkdownField/MarkdownField';
import OnlineOffline from '../Inputs/OnlineOffline/OnlineOffline';
import DateField from '../Inputs/DateField/DateField';
import Banner from '../Inputs/Banner/Banner';
import EventIcon from '../Inputs/EventIcon/EventIcon';

class EventForm extends React.Component {

  onSubmit = formValues => {
    let date = formValues.start_date;
    formValues.start_date = new Date(date);
    this.props.onSubmit(formValues);
  }

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
          <MarkdownField name='description' label="Description"/>
          <MarkdownField name='ruleset' label="Ruleset"/>
          <OnlineOffline required={this.required} initialValues={this.props.initialValues}/>
          <DateField required={this.required}/>
          <Banner initialValues={this.props.initialValues}/>
          <EventIcon initialValues={this.props.initialValues}/>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'eventForm' })(EventForm);