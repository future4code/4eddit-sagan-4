import axios from 'axios';

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit/signup"





// ASYNC

export const signup = (formData) => async (dispatch) => {
    const { email, password, username} = formData
    const data = {
        "email": email,
        "password": password,
        "username": username
    }
    try {
        const response = await axios.post(baseUrl, data)
        alert("Usuário criado com sucesso")
    }
    catch (error) {
        console.error(error)
    }
}