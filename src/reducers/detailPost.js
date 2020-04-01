const initialState = {
    posts: [],
    postDetailed: {}
}

const detailPost = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POST' : {
            return {
                ...state,
                postDetailed: action.payload.post
            }
        }

        default:
            return state; 
    }
}

export default detailPost;