import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import {setLogged} from "../../actions/menu"

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
`



class Menu extends React.Component {
    constructor(props) {
        super(props)
    }



    //colocar no redux esse comando ou extrair em uma função

    componentDidMount() {
        const token = window.localStorage.getItem("token")
        if (token === null) {
            this.props.setLogged(false)
        }
        else {
            this.props.setLogged(true)
        }
    }

    logout = () => {
        window.localStorage.removeItem('token')
        this.props.goToLogin()
        this.props.setLogged(false)
    }

    showMenu = () => {

        if (this.props.logged) {
            return (
                <div>
                    <button onClick={() => this.logout() }> LOGOUT </button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button onClick={this.props.goToLogin}>LOG IN</button>
                    <button onClick={this.props.goToSignup}>SIGN UP</button>
                </div>
            )
        }

    }

    render() {
        return (
            <MenuWrapper>
                <h1>4eddit</h1>
                {this.showMenu()}
            </MenuWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    goToSignup: () => dispatch(push(routes.signup)),
    goToLogin: () => dispatch(push(routes.login)),
    setLogged: (logged)=> dispatch(setLogged(logged))
})

const mapStateToProps = state => {
    return {
        logged: state.menu.logged
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);