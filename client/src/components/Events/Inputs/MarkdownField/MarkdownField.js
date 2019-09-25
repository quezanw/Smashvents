import React from 'react';
import { Field } from 'redux-form';
import styles from './MarkdownField.module.scss';
import MarkdownPane from '../../../MarkdownPane/MarkdownPane';

class MarkdownField extends React.Component {
  state = { text: '' }

  renderTextarea = ({input, label, meta}) => {
    return (
      <div className={styles.row}>
        <textarea className={styles.textarea} {...input}  autoComplete="off" />
      </div>
    );
  }

  onChange = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    let { name, label } = this.props;
    return (
      <div>
        <p className={styles.subHeader}>{label}</p>
        <div className={styles.wrapper}>
          <Field 
            name={name}
            type="text" 
            component={this.renderTextarea}
            value={this.state.text}
            onChange={this.onChange}
          />
          <MarkdownPane md={this.state.text} width="50%" height="250px" padding="1rem"/>
        </div>
      </div>
    );
  }
}

export default MarkdownField;