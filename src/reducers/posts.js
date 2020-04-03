const initialState = {
    posts: [],
    postDetailed: {},
    feed: []
}

const Posts = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POST' : {
            return {
                ...state,
                postDetailed: action.payload.post
            }
        };

        case "SET_FEED":{
            console.log(action.payload.feed)
            return {
                feed: action.payload.feed
            }
        };

        default:
            return state; 
    }
}

export default Posts;