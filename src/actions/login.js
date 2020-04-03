import axios from 'axios';
import { push } from "connected-react-router";
import { routes } from '../containers/Router'

const baseUrl = 'https://us-central1-future-apis.cloudfunctions.net/fourEddit'

export const login = (email, password) => async (dispatch) => {

    const loginData = {
        email,
        password
    }

    try {
        const response = await axios.post(
            `${baseUrl}/login`, loginData
        );

        const token = response.data.token;
        const username = response.data.user.username
        
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("user", username)

        dispatch(push(routes.feed))
    } catch (error) {
        alert('Por favor tentar novamente')
    }
}