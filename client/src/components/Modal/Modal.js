import React from 'react';
import styles from './Modal.module.scss';

const Modal = () => {

    function closeModal(e) {
        e.preventDefault();
        document.getElementById("modal-wrapper").style.display = "none";
    } 


    return (
        <div onClick={(e) => closeModal(e)} id="modal-wrapper" className={styles.wrapper}>
            <div className={styles.btn_container}>
                <p onClick={(e) => closeModal(e)}href="#">X Close</p>
            </div>
            <div onClick={(e) => e.stopPropagation()}className={styles.modal}>

            </div>
        </div>
    );

}

export default Modal;