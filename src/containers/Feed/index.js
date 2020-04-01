import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { push } from 'connected-react-router';
import { routes } from '../Router';
import { fetchFeed } from "../../actions/feed"
import {setLogged} from "../../actions/menu"
import Post from "../../components/Post"

class Feed extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const token = window.localStorage.getItem("token")
        console.log(token)
        if (token === null) {
            this.props.setLogged(false)
            this.props.goToLogin()
        }
        else{
            this.props.setLogged(true)
            this.props.fetchFeed(token)
        }
    }

    listFeed = () => {
        return (
            <div>
                <h2>Feed</h2>
                {this.props.feedList.map(post => {
                    return (
                        <Post key={post.id} post={post}/>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.feedList !== undefined ? this.listFeed() : <div>Carregando...</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        feedList: state.feed.feed
    }
}

const mapDispatchToProps = dispatch => ({
    fetchFeed: (auth) => dispatch(fetchFeed(auth)),
    goToLogin: () => dispatch(push(routes.login)),
    setLogged: (logged)=> dispatch(setLogged(logged))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);