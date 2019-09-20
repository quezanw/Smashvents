import React from 'react';
import Dropzone from 'react-dropzone';
import auth from '../../../apis/auth';
import { connect } from 'react-redux';
import styles from './DropzoneInput.module.scss';

const maxSize = 1048576; //1mb
class DropzoneInput extends React.Component {

  onDrop = acceptedFile => {
    console.log(acceptedFile[0]);
    // let formData = new FormData();
    // formData.append("file".acceptedFiles[0]);
    // let body = {
    //   user_id: this.props.user_id,
    //   profile_img: acceptedFile
    // }
    // auth.put('/edit/profile_img', body);
  }

  renderDrag = ({ getRootProps, getInputProps, isDragActive,isDragReject, rejectedFiles }) => {
    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive
          ? "Drop it when it's hot!"
          : "Click me or drag a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div>File is too large.</div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.dropzone}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
          maxSize={maxSize * 10}
          accept="image/png, image/jpg, image/jpeg"
        >
          {this.renderDrag}
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user_id: state.auth.user_id }
}

export default connect(mapStateToProps, {})(DropzoneInput);