import React, { Component } from "react";
import { login } from "../../actions/loginSignup";
import { connect } from "react-redux";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import {ButtonCustom} from '../../style/style';

const LoginWrapper = styled.form`
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

  signIn = (e) => {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <LoginWrapper onSubmit={this.signIn}>
        <TextField 
          onChange={this.handleFieldChange} 
          name="email"
          type="email"
          label="E-mail"
          pattern= "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
          value={this.state.email}
        />
        <TextField
          onChange={this.handleFieldChange}
          name="password"
          type="password"
          label="Password"
          value={this.state.password}
        />
        <ButtonCustom type="submit"> LOGIN </ButtonCustom>
      </LoginWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
})

export default connect (null, mapDispatchToProps)(LoginPage);
