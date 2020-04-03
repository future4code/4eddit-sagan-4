import React, { Component } from "react";
import { login } from "../../actions/login";
import { connect } from "react-redux";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import Signup from '../Signup/index';
import { push } from "connected-react-router";
import { routes } from "../../containers/Router";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`;

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

  signIn = () => {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <LoginWrapper>
        <TextField 
          onChange={this.handleFieldChange} 
          name="email"
          type="email"
          label="E-mail"
          value={this.state.email}
        />
        <TextField
          onChange={this.handleFieldChange}
          name="password"
          type="password"
          label="Password"
          value={this.state.password}
        />
        <button onClick={() => this.signIn()}> LOGIN </button>
      </LoginWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
})

export default connect (null, mapDispatchToProps)(LoginPage);
