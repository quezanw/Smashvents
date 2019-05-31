/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../styles/components/Nav.css'
import { logout } from '../../actions'
import { connect } from 'react-redux';
import React from 'react'
import { Link } from 'react-router-dom';

// import SignupModal from './SignupModal'

class Nav extends React.Component {
  renderLogin() {
    if(this.props.isSignedIn) {
      return (
        <button onClick={this.props.logout} className="nav-item nav-link">Logout</button>
      )
    }
    return <Link to="/login" className="nav-item nav-link">Login</Link>;
  }


  render() {
    return(
      <nav className="container d-flex flex-row navbar navbar-light bg-light navbar-expand-lg">
        <a className="navbar-brand mr-auto" href="#">Smashvents</a>
        <a className="nav-item nav-link active" href="#">
          Home <span className="sr-only">(current)</span>
        </a>
        {this.renderLogin()}
        <Link to="/signup" className="nav-item nav-link">Sign up</Link>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.login.isSignedIn };
}

export default connect(mapStateToProps, { logout })(Nav);
