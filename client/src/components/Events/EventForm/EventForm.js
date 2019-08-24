import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from './EventForm.module.scss';
import DatePicker from "react-datepicker";
import LocationSearch from '../Inputs/LocationSearch/LocationSearch';

import "react-datepicker/dist/react-datepicker.css";


class EventForm extends React.Component {
  state = { online: this.props.initialValues.online ? 'true' : 'false', 
            startDate: new Date(),
            banner: this.props.initialValues.banner_path,
            event_icon: this.props.initialValues.icon_path,
          }

  onSubmit = formValues => {
    let date = formValues.start_date;
    formValues.start_date = new Date(date);
    this.props.onSubmit(formValues);
  }

  onRadioChange = e => {
    if(e.currentTarget.checked) {
      // if(e.currentTarget.value === 'true') {
      //   this.props.clearVenue();
      // }
      this.setState({ online: e.currentTarget.value});
    }
  }

  onBannerChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ banner: e.currentTarget.value});
    }
  }

  onIconChange = e => {
    if(e.currentTarget.checked) {
      this.setState({ event_icon: e.currentTarget.value});
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
          checked={this.state.online === input.value}
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
      <div className={`${styles.col} ${styles.dateField}`}>
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
    let value = '';
    if(this.props.initialValues.venue) {
      value = this.props.initialValues.venue;
    }
    if(offline === 'false') {
      return (
        <Field 
          name="venue" 
          type="text" 
          label="Venue" 
          value={value}
          component={LocationSearch}
          validate={[this.required]}
        />
      )
    }
  }

  renderBannerImage = ({ input }) => {
    return (
      <div className={styles.bannerImgWrapper}>
        <label>
          <input
            {...input}
            type="radio" 
            value={input.value}
            checked={this.state.banner === input.value}
            className={styles.radioImageBtn}
          />
          <img className={styles.bannerImg} src={`/assets${input.value}`} alt="banner"/>
        </label>
      </div>
    );
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
          <img className={styles.eventIcon} src={`/assets${input.value}`} alt="banner"/>
        </label>
      </div>
    );
  }

  renderImagesContainer = (images) => {
    return (
      <div className={styles.imagesWrapper}>
        <p className={styles.label}>Event Banner</p>
        <div className={styles.images}>
          {images}
        </div>
      </div>
    );
  }

  render() {
    let banners = [1,2,3,4,5,6];
    let icons = [1,2,3,4,5];
    const bannerImages = banners.map(val => {
      return (
        <Field
          key={val}
          name="banner_path"
          type="radio"
          component={this.renderBannerImage}
          value={`/banner${val}.jpg`} 
          onChange={this.onBannerChange}
        />
      );
    })
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
            <p className={styles.label}>Online / Offline</p>
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
            <div className={styles.timeField}>
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

          </div>
          {this.renderImagesContainer(bannerImages)}
          {this.renderImagesContainer(eventIcons)}
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'eventForm'})(EventForm);
