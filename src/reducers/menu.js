const initialState = {
    logged: false
}

const menu = (state = initialState, action) => {
    switch(action.type) {
        case "SET_LOGGED":{

            return {
                logged: action.payload.logged
            }
        }
        default:{
            return state
        }
    }
}
export default menu;