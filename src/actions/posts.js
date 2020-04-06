import axios from 'axios';

const baseUrlPosts = "https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts" 

export const setPost = (post) => {
    return {
        type: 'SET_POST',
        payload: {
            post
        }
    }
}

export const setFeed = (feed) => {
    return {
        type: "SET_FEED",
        payload: {
            feed: feed
        }
    }
}

export const getPostDetail = (id) => async (dispatch) => {
    const token = window.localStorage.getItem('token')

    try {
        const response = await axios.get(
            `${baseUrlPosts}/${id}`,
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
        await axios.post(
            `${baseUrlPosts}/${id}/comment`,
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
        await axios.put(
            `${baseUrlPosts}/${idPost}/comment/${idComment}/vote`,
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

export const fetchFeed = (auth) => async (dispatch) => {
    try {
        const response = await axios.get(baseUrlPosts, { headers: { auth: auth } })
        dispatch(setFeed(response.data.posts))
    }
    catch (error) {
        console.error(error)
    }
}

export const votePost = (postId, direction, auth, userVoteDirection) => async (dispatch) => {
    console.log("direcao clicada"+ direction)
    console.log("direcao atual"+ userVoteDirection)
    if ((direction===userVoteDirection)){
        try {
            await axios.put(`${baseUrlPosts}/${postId}/vote`, { "direction": 0 }, { headers: { auth: auth } })
            dispatch(fetchFeed(auth))
        }
        catch (error) {
            console.error(error)
        }
        
    }else{
        try {
            await axios.put(`${baseUrlPosts}/${postId}/vote`, { "direction": parseInt(direction) }, { headers: { auth: auth } })
            dispatch(fetchFeed(auth))
        }
        catch (error) {
            console.error(error)
        }
    }
}


export const createPost = (post, auth) => async (dispatch) => {
    const { text, title } = post
    const data = {
        "text": text,
        "title": title
    }
    try {
        await axios.post(baseUrlPosts, data, {headers: {auth:auth}})
        alert("Post criado!")
        dispatch(fetchFeed(auth))
    }
    catch (error) {
        console.error(error)
    }
}