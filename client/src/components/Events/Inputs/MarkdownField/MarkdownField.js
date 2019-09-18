import React from 'react';
import { Field } from 'redux-form';
import styles from './MarkdownField.module.scss';

class MarkdownField extends React.Component {

  renderTextarea = ({input, label, meta}) => {
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <textarea className={styles.textarea} {...input}  autoComplete="off" />
      </div>
    );
  }

  render() {
    let { name, label } = this.props;
    return (
      <Field 
        name={name}
        type="text" 
        label={label}
        component={this.renderTextarea}
      />
    );
  }
}

export default MarkdownField;