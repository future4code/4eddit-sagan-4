import { act } from "react-dom/test-utils"

const initialState = {
    posts: [],
}

const tripDetail = (state = initialState, action) => {
    switch (action.type) {
        case 'DETAIL_POST' : {
            return {
                ...state,
                postDetailed: action.payload.post
            }
        }

        default:
            return state; 
    }
}