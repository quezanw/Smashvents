import React from 'react';
// import { connect } from 'react-redux'; 
import { reduxForm, Field } from 'redux-form';
import styles from './EventForm.module.scss';


class EventForm extends React.Component {

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(input)
    // const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div >
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* {this.renderError(meta)} */}
      </div>
    );
  };

  renderRadioInput = ({ input, label, meta, checked}) => {
    // const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div >
        <label>{label}</label>
        <input {...input} type="radio" autoComplete="off" />
      </div>
    );
  };

  renderDatePicker = ({input, label, meta}) => {
    return (
      <div >
        <label>{label}</label>
        <input {...input} type="date" autoComplete="off" />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div>
            <Field name="title" type="text" label="Title" component={this.renderInput} />
          </div>
          <div>
            <Field name="description" type="text" label="Description" component={this.renderInput}/>
          </div>
          <div>
            <Field name="ruleset" type="text" label="Ruleset" component={this.renderInput}/>
          </div>
          <div>
            <Field name="venue" type="text" label="Venue" component={this.renderInput}/>
          </div>
          <div>
            <Field name="online" type="radio" label="Online" value="true" component={this.renderRadioInput}/>
            <Field name="online" type="radio" label="Offline" value="false" component={this.renderRadioInput}/>
          </div>
          <div>
            <Field name="start_date" type="date" label="Start Date" component={this.renderDatePicker}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'eventForm' })(EventForm);

