import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchFeed } from "../../actions/feed"
import Post from "../../components/Post"

class Feed extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchFeed("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkR5RGtTWlRPaDhLS2V1TDZDR3hIIiwiZW1haWwiOiJhbmRyaXVzLnJvY2hhbGF6YXJpbm9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbmRyaXVzcmwiLCJpYXQiOjE1ODU2NjI0Njl9.v9BopDmhppBAwdyTqE2An3lVsHruXdGTR7GaiZje5t8")
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
                {this.props.feedList !== undefined ? this.listFeed() : <div>Carregando</div>}
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
    fetchFeed: (auth) => dispatch(fetchFeed(auth))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);