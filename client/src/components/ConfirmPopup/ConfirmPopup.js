import React from 'react';
import styles from './ConfirmPopup.module.scss';

class ConfirmPopup extends React.Component {

  confirmAction = () => {
    this.props.config.confirm();
  }

  render() {
    let { header, message } = this.props.config;
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>{header}</div>
        <div className={styles.content}>
          <h1 className={styles.message}>
            {message}
          </h1>
          <div className={styles.btnContainer}>
            <button onClick={this.confirmAction}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmPopup;
