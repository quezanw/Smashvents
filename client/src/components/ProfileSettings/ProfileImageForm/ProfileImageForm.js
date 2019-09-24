import React from 'react';
import styles from './ProfileImageForm.module.scss';
import DropzoneInput from '../../DropzoneInput/DropzoneInput';
import { connect } from 'react-redux';
import { deleteProfileImage } from '../../../actions/index';

class ProfileImageForm extends React.Component {

  renderProfileImg = () => {
    if(this.props.profile_img.length < 1) {
      return <DropzoneInput/>
    }
    return (
      <div className={styles.row}>
        <div className={styles.imgWrapper}>
          <img src={`${this.props.profile_img}`} alt="profile"/>
        </div>
        <p onClick={this.props.deleteProfileImage} className={styles.btnDelete}>
        <i className="far fa-trash-alt"></i>
          Remove File
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Profile Image</h1>
        <form className={styles.form} >
          <h3>Must be a least 160x160. Max file size: 10MB.</h3>
          <div className={styles.upload}>
            {this.renderProfileImg()}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { profile_img: state.auth.profile_img }
}

export default connect(mapStateToProps, { deleteProfileImage })(ProfileImageForm);
