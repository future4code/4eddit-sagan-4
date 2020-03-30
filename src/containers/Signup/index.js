import React from "react"
import { connect } from "react-redux"
import {signup} from "../../actions/signup"

const signupForm = [
    {
        name: "email",
        label: "Email",
        type: "text",
        required: true,
        //ADICIONAR PATTERN
        title: "Email do usuário",
    },
    {
        name: "username",
        label: "Usuário",
        type: "text",
        required: true,
        //ADICIONAR PATTERN
        title: "Nome do usuário",
    },
    {
        name: "password",
        label: "Senha",
        type: "password",
        required: true,
        //ADICIONAR PATTERN
        title: "Senha do usuário",
    }
]

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            form: {}
        }
    }

    handleFormChange = (e)=>{
        const { name, value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    handleOnSubmit = (e)=>{
        e.preventDefault()
        this.props.signup(this.state.form)
    }

    render(){

        return(
            <form onSubmit={this.handleOnSubmit}>
                {signupForm.map((form)=>{
                    if (form.type==="text" ||form.type==="password"){
                        return (
                            <div key={form.name}>
                                <label htmlFor={form.name}>{form.label}: </label>
                                <input
                                    id={form.name}
                                    name={form.name}
                                    type={form.type}
                                    value={this.state.form[form.name] || ""}
                                    required={form.required}
                                    onChange={this.handleFormChange}
                                />
                            </div>
                        )
                    }
                    return (
                        <div>Tipo de formulário não encontrado</div>
                    )
                    
                })}
                <button type="submit">Criar conta</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signup: (formData) => dispatch(signup(formData))
})

export default connect(null, mapDispatchToProps) (Signup);