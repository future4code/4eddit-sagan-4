import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getPostDetail, createComment, voteComment } from '../../actions/posts'
import { push } from 'connected-react-router';
import { routes } from '../Router';
import styled from 'styled-components'
import { TextareaAutosize} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'
import { ButtonCustom } from '../../style/style';
import Card from '@material-ui/core/Card';
import { classes } from '../../style/theme';

const BoxComment = styled.div`
`
const BoxButton = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    padding-top: 10px;
`
const TextareaAutosizeCustom = styled(TextareaAutosize)`
    overflow: hidden;
    width: 100%;
`
const BoxVoteComment = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const CommentMade = styled(Card)`
    margin: 9px;
`
const HeaderAndFooterBox = styled.div`
    background-color: #0d47a1;
    color: white;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 9px;
`
const DivComment = styled.div`
    min-height: 80px;
    padding-left: 9px;
`
const SpanUserLogged = styled.span`
    color: #2196f3;
    text-decoration: underline;
`
class DetailPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')

        if (!token) {
            this.props.redirectLogin()
        }

        if (token && this.props.getPostDetail) {
            this.props.getPostDetail(this.props.post.id)
        }

    }

    handleOnInput = event => {
        this.setState({
            comment: event.target.value
        })
    }

    onClickLike = (idPost, idComment, directionPrevious) => {
        const directionNew = parseInt(1);
        this.props.commentVote(idPost, idComment, directionNew, directionPrevious)
    }

    onClickDeslike = (idPost, idComment, directionPrevious) => {
        const directionNew = parseInt(-1);
        this.props.commentVote(idPost, idComment, directionNew, directionPrevious)
    }

    render() {
        const userLogged = window.localStorage.getItem('user')
        return (
            <div>
                <div>
                    <p> Post: {this.props.post.text} </p>
                    <p> Votos: {this.props.post.votesCount}</p>
                </div>
                <BoxComment>
                    <p> Comentar como <SpanUserLogged> {userLogged} </SpanUserLogged></p>
                    <TextareaAutosizeCustom
                        aria-label="maximun height"
                        rowsMin={6}
                        rowsMax={15}
                        placeholder="Deixe o seu comentário."
                        onChange={this.handleOnInput}
                    />
                    <BoxButton>
                        <ButtonCustom disableElevation onClick={() => this.props.comment(this.props.post.id, this.state.comment)}> COMENTAR </ButtonCustom>
                    </BoxButton>
                </BoxComment>
                <BoxVoteComment>
                    {this.props.post.comments && this.props.post.comments.map(comment => {
                        return (
                            <CommentMade className={classes.card}>
                                    <HeaderAndFooterBox>
                                        <p> {comment.username}</p>
                                    </HeaderAndFooterBox>
                                    <DivComment>
                                        <p> {comment.text}</p>
                                    </DivComment>
                                    <HeaderAndFooterBox>
                                        <ArrowUpward
                                            onClick={() => this.onClickLike(this.props.post.id, comment.id, comment.userVoteDirection)}
                                            color={comment.userVoteDirection === 1 ? 'action' : 'inherit'}
                                        />
                                        <span>{Math.abs(comment.votesCount)}</span>
                                        <ArrowDownward
                                            color={comment.userVoteDirection === -1 ? 'action' : 'inherit'}
                                            onClick={() => this.onClickDeslike(this.props.post.id, comment.id, comment.userVoteDirection)}
                                        />
                                    </HeaderAndFooterBox>
                            </CommentMade>
                        )
                    })}
                </BoxVoteComment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.posts.postDetailed
})

const mapDispatchToProps = (dispatch) => ({
    redirectLogin: () => dispatch(push(routes.root)),
    getPostDetail: (id) => dispatch(getPostDetail(id)),
    comment: (id, textComment) => dispatch(createComment(id, textComment)),
    commentVote: (idPost, idComment, directionNew, directionPrevious) => {
        const direction = directionNew === directionPrevious ? parseInt(0) : directionNew

        dispatch(voteComment(idPost, idComment, direction))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)