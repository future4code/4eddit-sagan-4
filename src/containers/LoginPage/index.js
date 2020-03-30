import React, { Component } from "react";
import { login } from "../../actions/login";
import { connect } from "react-redux";
import { push } from "connected-react-router";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();

    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <div>
      <input onChange={this.handleFieldChange} 
        name="email"
        type="email"
        label="E-mail"
        value={this.state.email}
      />
      <input
        onChange={this.handleFieldChange}
        name="password"
        type="password"
        label="Password"
        value={this.state.password}
      />
      <button onSubmit={this.handleOnSubmit}> LOGIN </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password))
})

export default connect (null, mapDispatchToProps)(LoginPage);
