import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './DropzoneInput.module.scss';
import { connect } from 'react-redux';
import { editProfileImage } from '../../../actions/index';

const maxSize = 1048576; //1mb
class DropzoneInput extends React.Component {

  onDrop = file => this.props.editProfileImage(file[0])

  renderDrag = ({ getRootProps, getInputProps, isDragActive,isDragReject, rejectedFiles }) => {
    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
    return (
      <div className={styles.dropzone} {...getRootProps()}>
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
      <Dropzone
        onDrop={this.onDrop}
        multiple={false}
        maxSize={maxSize * 10}
        accept="image/png, image/jpg, image/jpeg"
      >
        {this.renderDrag}
      </Dropzone>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { editProfileImage })(DropzoneInput);