import React from "react"
import { connect } from "react-redux"
import { signup } from "../../actions/loginSignup"
import { TextField } from "@material-ui/core";
import styled from "styled-components"
import { ButtonCustom } from '../../style/style';

const signupForm = [
    {
        name: "email",
        label: "Email",
        type: "text",
        required: true,
        pattern: "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/",
        title: "Email do usuário",
    },
    {
        name: "username",
        label: "Usuário",
        type: "text",
        required: true,
        pattern: "/^@[A-Za-z0-9]+([._][A-Za-z0-9]+)*$/",
        title: "Nome do usuário",
    },
    {
        name: "password",
        label: "Senha",
        type: "password",
        required: true,
        title: "Senha do usuário",
    }
]

const SignupWrapper = styled.form`
    width: 100%;
  height: 100vh;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }

    handleFormChange = (e) => {
        const { name, value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        this.props.signup(this.state.form)
    }

    render() {

        return (
            <SignupWrapper onSubmit={this.handleOnSubmit}>
                {signupForm.map((form) => {
                    if (form.type === "text" || form.type === "password") {
                        return (
                            <div key={form.name}>
                                <TextField
                                    onChange={this.handleFormChange}
                                    id={form.name}
                                    name={form.name}
                                    type={form.type}
                                    required={form.required}
                                    label={form.label}
                                    value={this.state.form[form.name] || ""}
                                />
                            </div>
                        )
                    }
                    return (
                        <div>Tipo de formulário não encontrado</div>
                    )

                })
                }
                <ButtonCustom type="submit">Criar conta</ButtonCustom>
            </SignupWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signup: (formData) => dispatch(signup(formData))
})

export default connect(null, mapDispatchToProps)(Signup);