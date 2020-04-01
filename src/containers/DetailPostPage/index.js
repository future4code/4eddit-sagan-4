import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getPostDetail, createComment, voteComment } from  '../../actions/detailPost'
import { push } from 'connected-react-router';
import { routes } from '../Router';

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
            this.props.getPostDetail("1hb1TzCJBRMac89DLX1W") 
            //Lembrar de quando for chamar, trocar o id passado acima por this.props.id
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
        return (
            <div>
                <button onClick={() => window.localStorage.removeItem('token')}> Logout </button>
                <p> Usuário: {this.props.post.username}</p>
                <p> Post: {this.props.post.text} </p>
                <label for="comment"> Deixe seu comentário</label>
                <input type="text" id="comment" name="comment" onChange={this.handleOnInput}/> 
                <button onClick={() => this.props.comment(this.props.post.id, this.state.comment)}> Enviar </button>
                {this.props.post.comments && this.props.post.comments.map(comment => {
                    return (
                        <div>
                            <p> Usuário: {comment.username}</p>
                            <p> Comentário: {comment.text}</p>
                            <button onClick={() => this.onClickLike(this.props.post.id, comment.id, comment.userVoteDirection)}> Like </button>
                            <button onClick={() => this.onClickDeslike(this.props.post.id, comment.id, comment.userVoteDirection)}> Dislike </button>
                            <p>Direction: {comment.userVoteDirection}</p>
                        </div>
                    )
                }) }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.detailPost.postDetailed
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

export default connect (mapStateToProps, mapDispatchToProps)(DetailPost)