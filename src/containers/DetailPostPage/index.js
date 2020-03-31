import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class DetailPost extends Component {
    
    componentDidMount() {
        if (this.props.getPostDetail) {
            this.props.getPostDetail(this.props.post.id)
        }
    }


    render() {
        return (
            <div>
                <p> Post: {this.props.post} </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.DetailPost.postDetailed 
})

const mapDispatchToProps = (dispatch) => ({
    getPostDetail: (id) => dispatch(getPostDetail(id))
})

export default connect (mapStateToProps, mapDispatchToProps)(DetailPost)