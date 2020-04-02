import axios from 'axios';

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts"



export const setFeed = (feed) => {
    return {
        type: "SET_FEED",
        payload: {
            feed: feed
        }
    }
}

//ASYNC
export const fetchFeed = (auth) => async (dispatch) => {
    try {
        const response = await axios.get(baseUrl, { headers: { auth: auth } })
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
            const response = await axios.put(`${baseUrl}/${postId}/vote`, { "direction": 0 }, { headers: { auth: auth } })
            dispatch(fetchFeed(auth))
        }
        catch (error) {
            console.error(error)
        }
        
    }else{
        try {
            const response = await axios.put(`${baseUrl}/${postId}/vote`, { "direction": parseInt(direction) }, { headers: { auth: auth } })
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
        const response = await axios.post(baseUrl, data, {headers: {auth:auth}})
        alert("Post criado!")
        dispatch(fetchFeed(auth))
    }
    catch (error) {
        console.error(error)
    }
}