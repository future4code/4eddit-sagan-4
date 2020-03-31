import React from "react";
import styled from "styled-components";

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
                    <button>Deslike</button>
                    {votesCount}
                    <button>Like</button>
                </FooterPostItem>
                <FooterPostItem>
                    {commentsCount} Comentários
                </FooterPostItem>

            </FooterPost>
        </PostWrapper>
    )
}
export default Post;