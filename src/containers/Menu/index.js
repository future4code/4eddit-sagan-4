import React, { Fragment } from "react";
import styled from "styled-components";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {ButtonCustom} from '../../style/style';
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import { setLogged } from "../../actions/menu"

const MenuItems = styled.div`
    width: 80%;
    margin-left:auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const MenuItem = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

const Logo = styled.a`
    text-decoration: none;
    :link{
        text-decoration: none;
        color:inherit;
    }
    :visited {
        text-decoration: none;
        color:inherit;
    }
    a:active {
        text-decoration: none;
        color:inherit;
    }
`


class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

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
                <Fragment>
                    <ButtonCustom variant="outlined" onClick={this.props.goToFeed}> FEED </ButtonCustom>
                    <ButtonCustom variant="outlined" onClick={this.logout}> LOGOUT </ButtonCustom>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <ButtonCustom variant="outlined" onClick={this.props.goToLogin}> LOG IN </ButtonCustom>
                    <ButtonCustom variant="outlined" onClick={this.props.goToSignup}> SIGN UP </ButtonCustom>
                </Fragment>
            )
        }

    }

    render() {
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <MenuItems>
                        <MenuItem>
                            <Typography variant="h3" color="inherit">
                                <Logo href="#" onClick={this.props.goToFeed}>4eddit</Logo>
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            {this.showMenu()}
                        </MenuItem>
                    </MenuItems>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    goToSignup: () => dispatch(push(routes.signup)),
    goToLogin: () => dispatch(push(routes.login)),
    goToFeed: () => dispatch(push(routes.feed)),
    setLogged: (logged) => dispatch(setLogged(logged))
})

const mapStateToProps = state => {
    return {
        logged: state.menu.logged
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);