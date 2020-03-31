import axios from 'axios';

const baseUrl = 'https://us-central1-future-apis.cloudfunctions.net/fourEddit/'

const detailPost = (post) => {
    return {
        type: 'DETAIL_POST', 
        payload: {
            post
        }
    }
}

const getPostDetail = (id) => async (dispatch) => {
    const token = window.localStorage.getItem('token')

    try {
        const response = await axios.get(
            `${baseUrl}/posts/${id}`,
            { headers: {
                'auth': token
            }}
        )

        dispatch(detailPost(post))

    } catch (error) {
        alert('Por favor, tente novamente')
    }
}