import React from 'react';
import styles from './Modal.module.scss';
import { connect } from 'react-redux';
import { closeModal, clearLoginReg } from '../../actions/index';

class Modal extends React.Component {
  constructor(props) {
    super();
  }
  
  closeModal = () => {
    // this.props.clearLoginReg();
    this.props.closeModal();
  }

  render() {
    return (
      <div onClick={this.closeModal} id="modal-wrapper" className={styles.wrapper}>
        <div className={styles.btn_container}>
            <p onClick={this.closeModal}>close</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}className={styles.modal}>
            {this.props.content}
        </div>
      </div>
    );
  }
}

export default connect(null, { closeModal, clearLoginReg })(Modal);