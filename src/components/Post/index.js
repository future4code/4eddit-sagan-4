import React from "react";
import styled from "styled-components";
import { connect } from "react-redux"
import { votePost } from "../../actions/feed"
import detailPost from "../../reducers/detailPost";
import { push } from "connected-react-router";
import { setPost } from "../../actions/detailPost";
import { routes } from "../../containers/Router";

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
                <p>{text}</p>
            </div>
            <FooterPost>
                <FooterPostItem>
                    {handleVoteDirection(userVoteDirection)}

                    {/* ALTERAR AUTH PARA O DO LOGIN */}
                    <button onClick={() => {
                        props.votePost(id, -1, props.auth)
                    }}>Deslike</button>
                    {votesCount}
                    <button onClick={() => {
                        props.votePost(id, 1, props.auth)
                    }}>Like</button>
                    <button onClick={() => { props.setPost(props.post); props.redirectDetailPostPage() }}>Detalhar</button>
                </FooterPostItem>
                <FooterPostItem>
                    {commentsCount} Comentários
                </FooterPostItem>

            </FooterPost>
        </PostWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    votePost: (postId, direction, auth) => dispatch(votePost(postId, direction, auth)),
    setPost: (post) => dispatch(setPost(post)),
    redirectDetailPostPage: () => dispatch(push(routes.detailPost))
})

export default connect(null, mapDispatchToProps)(Post);