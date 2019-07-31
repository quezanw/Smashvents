import React from 'react';
import styles from './Modal.module.scss';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/index';

class Modal extends React.Component {
    constructor(props) {
        super();
    }
    closeModal(e) {
        e.preventDefault();
        this.props.closeModal();
    } 

    render() {
        return (
            <div onClick={(e) => this.closeModal(e)} id="modal-wrapper" className={styles.wrapper}>
                <div className={styles.btn_container}>
                    <p onClick={(e) => this.closeModal(e)}href="#">X Close</p>
                </div>
                <div onClick={(e) => e.stopPropagation()}className={styles.modal}>
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default connect(null, { closeModal })(Modal);