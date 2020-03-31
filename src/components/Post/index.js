import React from "react";
import styled from "styled-components";
import { connect } from "react-redux"
import { votePost } from "../../actions/feed"

const PostWrapper = styled.div`
    border: 1px solid black;
    margin: 3px;
`
const FooterPost = styled.div`
    display: flex;
    justify-content: space-between;
`
const FooterPostItem = styled.div`
    display: flex;
    align-items: center;
`
const HeaderPostItem = FooterPostItem

const handleVoteDirection = (userVoteDirection) => {
    if (userVoteDirection === 0) {
        return (<p>Não votou</p>)
    }
    else if (userVoteDirection === -1) {
        return (<p>Votou negativo</p>)
    }
    else if (userVoteDirection === 1) {
        return (<p>Votou positivo</p>)
    }
}

const Post = (props) => {
    const { userVoteDirection, id, votesCount, commentsCount, text, username, createdAt, title } = props.post
    const date = new Date(createdAt)
    return (
        <PostWrapper>
            <HeaderPostItem>
                <h2>{title}</h2>
                <p>Postado por {username} {date.toISOString()}</p>
            </HeaderPostItem>
            <div>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <FooterPost>
                <FooterPostItem>
                    {handleVoteDirection(userVoteDirection)}

                    {/* ALTERAR AUTH PARA O DO LOGIN */}
                    <button onClick={() => {
                        props.votePost(id, -1, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkR5RGtTWlRPaDhLS2V1TDZDR3hIIiwiZW1haWwiOiJhbmRyaXVzLnJvY2hhbGF6YXJpbm9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbmRyaXVzcmwiLCJpYXQiOjE1ODU2NjI0Njl9.v9BopDmhppBAwdyTqE2An3lVsHruXdGTR7GaiZje5t8")
                    }}>Deslike</button>
                    {votesCount}
                    <button onClick={() => {
                        props.votePost(id, 1, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkR5RGtTWlRPaDhLS2V1TDZDR3hIIiwiZW1haWwiOiJhbmRyaXVzLnJvY2hhbGF6YXJpbm9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbmRyaXVzcmwiLCJpYXQiOjE1ODU2NjI0Njl9.v9BopDmhppBAwdyTqE2An3lVsHruXdGTR7GaiZje5t8")
                    }}>Like</button>
                </FooterPostItem>
                <FooterPostItem>
                    {commentsCount} Comentários
                </FooterPostItem>

            </FooterPost>
        </PostWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    votePost: (postId, direction, auth) => dispatch(votePost(postId, direction, auth))
})

export default connect(null, mapDispatchToProps)(Post);