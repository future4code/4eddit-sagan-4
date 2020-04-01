import axios from 'axios';

const baseUrl = 'https://us-central1-future-apis.cloudfunctions.net/fourEddit'


export const setPost = (post) => {
    return {
        type: 'SET_POST',
        payload: {
            post
        }
    }
}


export const getPostDetail = (id) => async (dispatch) => {
    const token = window.localStorage.getItem('token')

    try {
        const response = await axios.get(
            `${baseUrl}/posts/${id}`,
            { headers: {
                auth: token
            }}
        )
            
        const post = response.data.post

        dispatch(setPost(post))
    } catch (error) {
        alert('Por favor, tente novamente')
    }
}

export const createComment = (id, textComment) => async (dispatch) => {
    const token = window.localStorage.getItem('token')
    const comment = {text: textComment}

    try {
        const response = await axios.post(
            `${baseUrl}/posts/${id}/comment`,
            comment,
            { headers : {
                auth: token 
            }}
        )
        dispatch(getPostDetail(id))

    } catch (error) {
        alert('Por favor, tente novamente.')
    }
}

export const voteComment = (idPost, idComment, direction) => async (dispatch) => {
    const token = window.localStorage.getItem('token')

    try {
        const response = await axios.put(
            `${baseUrl}/posts/${idPost}/comment/${idComment}/vote`,
            { direction },
            { headers : {
                auth: token
            }}
        )

        dispatch(getPostDetail(idPost))

    } catch (error) {
        alert('Por favor, tente novamente.')
    }
}