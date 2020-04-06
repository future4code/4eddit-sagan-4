import React from "react";
import styled from "styled-components";
import { connect } from "react-redux"
import { votePost } from "../../actions/posts"
import { push } from "connected-react-router";
import { setPost } from "../../actions/posts";
import { routes } from "../../containers/Router";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowdownwardIcon from '@material-ui/icons/ArrowDownward';
import { ButtonCustom } from '../../style/style';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { classes } from '../../style/theme';

const PostWrapper = styled(Card)`
    margin: 9px;
`
const FooterPost = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #0d47a1;
`
const FooterPostItem = styled.div`
    background-color: #0d47a1;
    color: white;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 9px;
    padding-right: 9px;
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

const HandleArrowUp = (userVoteDirection) => {
    if (userVoteDirection === -1) {
        return "action"
    } else {
        return "inherit"
    }

}
const HandleArrowDown = (userVoteDirection) => {
    if (userVoteDirection === 1) {
        return "action"
    } else {
        return "inherit"
    }

}

const voteMenu = (props) => {
    const { userVoteDirection, id, votesCount, commentsCount, text, username, createdAt, title } = props.post
    return (
        <FooterPostItem>
            <ArrowdownwardIcon color={HandleArrowUp(userVoteDirection)} onClick={() => {
                props.votePost(id, -1, props.auth, userVoteDirection)
            }} />

            {votesCount}

            <ArrowUpwardIcon color={HandleArrowDown(userVoteDirection)} onClick={() => {
                props.votePost(id, 1, props.auth, userVoteDirection)
            }} />
            <ButtonCustom onClick={() => { props.setPost(props.post); props.redirectDetailPostPage() }}>Detalhar</ButtonCustom>
        </FooterPostItem>
    )
}


const Post = (props) => {
    const { userVoteDirection, id, votesCount, commentsCount, text, username, createdAt, title } = props.post
    const date = new Date(createdAt)
    return (
        <PostWrapper className={classes.card}>
            <HeaderPostItem>
                <h2>{title}</h2>
                <p>Postado por {username}</p>
            </HeaderPostItem>
            <div>
                <p>{text}</p>
            </div>
            <FooterPost>
                {voteMenu(props)}
                <FooterPostItem>
                    {commentsCount} Comentários
                </FooterPostItem>

            </FooterPost>
        </PostWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    votePost: (postId, direction, auth, userVoteDirection) => dispatch(votePost(postId, direction, auth, userVoteDirection)),
    setPost: (post) => dispatch(setPost(post)),
    redirectDetailPostPage: () => dispatch(push(routes.detailPost))
})

export default connect(null, mapDispatchToProps)(Post);