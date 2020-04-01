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
        
        window.localStorage.setItem("token", token);

        dispatch(push(routes.feed))

    } catch (error) {
        alert('Por favor tentar novamente')
    }
}