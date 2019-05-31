import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from "react-redux";
import { createUser } from "../../actions";
import UserForm from './UserForm'

import history from '../../history'


class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  onSubmit = (formValues) => {
    this.props.createUser(formValues);
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    history.push('/');
  }

  render() {
    let formConfig = [
      {
        name: 'firstname',
        label: 'First Name'
      },
      {
        name: 'lastname',
        label: 'Last Name'
      },
      {
        name: 'gamertag',
        label: 'Gamertag'
      },
      {
        name: 'email',
        label: 'Email'
      },
      {
        name: 'password',
        label: 'Password'
      }
    ];
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
          <ModalBody>
            <UserForm onSubmit={this.onSubmit} formConfig={formConfig} toggle={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { createUser })(SignupModal);