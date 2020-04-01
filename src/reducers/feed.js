const initialState = {
    feed: []
}

const feed = (state = initialState, action) => {
    switch(action.type) {
        case "SET_FEED":{
            console.log(action.payload.feed)
            return {
                feed: action.payload.feed
            }
        }
        default:{
            return state
        }
    }
}
export default feed;