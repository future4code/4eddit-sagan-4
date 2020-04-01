import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { push } from 'connected-react-router';
import { routes } from '../Router';
import { fetchFeed, createPost } from "../../actions/feed"
import { setLogged } from "../../actions/menu"
import Post from "../../components/Post"

const postForm = [
    {
        name: "title",
        label: "Titulo do post",
        type: "text",
        required: true,
        //ADICIONAR PATTERN
        title: "Titulo do post",
    },
    {
        name: "text",
        label: "Texto do post",
        type: "text",
        required: true,
        //ADICIONAR PATTERN
        title: "Texto do post",
    }
]

const token = window.localStorage.getItem("token")

class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }

    componentDidMount() {
        console.log(token)
        if (token === null) {
            this.props.setLogged(false)
            this.props.goToLogin()
        }
        else {
            this.props.setLogged(true)
            this.props.fetchFeed(token)
        }
    }

    handleFormChange = (e) => {
        const { name, value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    listFeed = () => {
        return (
            <div>
                <h2>Feed</h2>
                {this.props.feedList.map(post => {
                    return (
                        <Post key={post.id} post={post} />
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Post</h2>
                <form onSubmit={(event)=>{
                    event.preventDefault()
                    this.props.createPost(this.state.form, token)
                    }}>

                    {/* EXTRAIR MAP PARA UMA FUNÇÃO */}

                    {postForm.map((form) => {
                        if (form.type === "text") {
                            return (
                                <div key={form.name}>
                                    <label htmlFor={form.name}>{form.label}: </label>
                                    <input
                                        id={form.name}
                                        name={form.name}
                                        type={form.type}
                                        value={this.state.form[form.name] || ""}
                                        required={form.required}
                                        onChange={this.handleFormChange}
                                    />
                                </div>
                            )
                        }
                        return (
                            <div>Tipo de formulário não encontrado</div>
                        )

                    })
                    }
                    <button type="submit">Criar post</button>
                </form>
                {this.props.feedList !== undefined ? this.listFeed() : <div>Carregando...</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        feedList: state.feed.feed
    }
}

const mapDispatchToProps = dispatch => ({
    fetchFeed: (auth) => dispatch(fetchFeed(auth)),
    createPost: (post, auth) => dispatch(createPost(post, auth)),
    goToLogin: () => dispatch(push(routes.login)),
    setLogged: (logged) => dispatch(setLogged(logged))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);