import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import UserForm from './UserForm'
import { connect } from "react-redux";
import { loginUser} from "../actions";
import history from '../history'


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    history.push('/');
  }


  onSubmit = (formValues) => {
    this.props.loginUser(formValues);
  };

  render() {
    let formConfig = [
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
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <UserForm onSubmit={this.onSubmit}formConfig={formConfig} toggle={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { loginUser})(LoginModal);