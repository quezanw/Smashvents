import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import "../styles/components/UserForm.css";

// import auth from '../apis/auth';

class UserForm extends React.Component {
  renderError({ touched, error }) {
    // console.log(error)
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(input);
    if (meta.error) {
      console.log(meta.error);
    }
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className={`form-control ${className}`}
          autoComplete="off"
          type={`${label === "Password" ? "password" : "text"}`}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderFields() {
    return this.props.formConfig.map(config => {
      return (
        <Field
          type="password"
          name={config.name}
          label={config.label}
          component={this.renderInput}
          key={config.name}
        />
      );
    });
  }

  // onSubmit = formValues => {
  //   // let errors = validateForm(formValues);
  //   // if(errors) {
  //   //   console.log(errors)
  //   // } else {
  //   if (Object.keys(formValues).length > 2) {
  //     this.props.createUser(formValues);
  //   } else {
  //     this.props.loginUser(formValues);
  //   }
  //   // }
  // };

  onSubmit = formValues => {
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <div className="sign-in-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <button className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

const validateForm = formValues => {
  // console.log('validate form ping');
  // console.log(formValues)
  const errors = {};
  if (!formValues.firstname) {
    errors["firstname"] = "First name field is required.";
  }
  if (!formValues.lastname) {
    errors.lastname = "Last name field is required.";
  }
  if (!formValues.email) {
    errors.email = "Email field is required";
  }
  if (!formValues.password) {
    errors.password = "Password field required";
  }
  return errors;
};

// const connectComponent = connect(null, { createUser })(SignupForm)
// export default UserForm
// export default connect(null, { loginUser, createUser })
//   (reduxForm({
//     form: "UserForm",
//     fields: ["firstname", "lastname", "email", "password"],
//     validate: validateForm
//   })(UserForm)
// );
// export default UserForm;
export default reduxForm({
      form: "UserForm",
      validate: validateForm
    })(UserForm);
