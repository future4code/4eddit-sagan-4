import React from "react";
import { connect } from "react-redux"
import {push} from "connected-react-router"
import {routes} from "../Router"

class Menu extends React.Component {
        constructor(props) {
            super(props)
        }

        render() {

            return (
                <div>
                    Menu
                </div>
            )
        }
    }

const mapDispatchToProps = dispatch => ({
    signup: () => dispatch(push(routes.signup))
})

export default connect(null, mapDispatchToProps)(Menu)