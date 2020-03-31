import axios from 'axios';

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts"



export const setFeed = (feed) => {
    return {
        type: "SET_FEED",
        payload: {
            feed:feed
        }
    }
}

//ASYNC
export const fetchFeed = (auth) => async (dispatch) => {
    try {
        const response = await axios.get(baseUrl,{headers:{auth:auth}})
        dispatch(setFeed(response.data.posts))
    }
    catch (error) {
        console.error(error)
    }
}